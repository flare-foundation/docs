#!/bin/bash

verifierlist=("btc" "xrp" "doge" "evm" "proof")

if [[ $# -eq 0 ]]
then
    echo "Provide verifier type, which must be one of: ${verifierlist[*]}"
    exit 1
fi

verifierTypeInput=$1
verifiertype=$(echo "$verifierTypeInput" |  tr '[:upper:]' '[:lower:]')

if [[ ! ${verifierlist[@]} =~ $verifiertype ]]
then
    echo "Unknown verifier type. Type must be one of: ${verifierlist[*]}"
    exit 1
fi
if [[ $verifiertype == "evm" ]]
then
    repo_url="https://github.com/flare-foundation/evm-verifier.git"

else
    repo_url="https://github.com/flare-foundation/attestation-client.git"
fi
repo_name=$(basename $repo_url .git)
if [ ! -d $repo_name ]
then
    git clone $repo_url
fi
echo "Directory: $repo_name"

path=$repo_name

typeUpperCase=$(echo "$verifiertype" | tr '[:lower:]' '[:upper:]')
# Check verifier type, change the name of output file if verifier type is proof or evm.
if [[ $verifiertype == "proof" ]]
then
    filename="attestation-client"
    title="Attestation Client Public Server"
elif [[ $verifiertype == "evm" ]]
then
    filename="evm"
    title="Verifier Template Server"
else
    filename=$verifiertype
    title="Verifier and Indexer Server(test$typeUpperCase)"
fi
# Generate schema from source code.
generate_schema(){
    local alldtofile=$1
    allSchema=$(awk '/^export class /{ p = 1; class_name=$3}p; /^\}/ && p { p = 0; print "\\"}' "$alldtofile")
    oldIFS=$IFS
    IFS='\'
    allSchemaArray=($allSchema)
    IFS=$oldIFS
    typeSchemaCounter=1
    typeSchemaLen=${#allSchemaArray[@]}

    for i in "${!allSchemaArray[@]}"
    do
        printf ' %s \n\\' "${allSchemaArray[$i]}" > schema[$i].list
        class_name=$(echo "${allSchemaArray[$i]}" | awk '/^export class /{ p = 1; print $3 };' )
        if [[ $verifiertype == "evm" ]]
        then
            description=$(sed -En '/@ApiProperty\(\{/,/\}\)/{ s/"//g;s/.*description: `(.*)`.*$/"\1"\\/p }' schema[$i].list )
        else
            description=$(sed -En '/@ApiProperty\(\{/,/\}\)/{ s/.*description: `(.*)`.*$/"\1"\\/p }' schema[$i].list | tr -d '\t')
        fi

        example=$(sed -En '/@ApiProperty\(\{/,/\}\)/{ s/.*example: ([^,}]*).*/\1\\/p }' schema[$i].list | tr -d '\t')


        propertylist=($(awk '$1~/^[a-zA-Z]+\?*:/{print $0}' schema[$i].list |sed -En 's/description:.*//g;s/example:.*//g; s/://g;s/\?//g;s/;//g;p' | awk '{print $1}'))
        typelist=($(awk '$1~/^[a-zA-Z]+\?*:/{print $0}' schema[$i].list |sed -En 's/description:.*//g;s/example:.*//g; s/://g;s/\?//g;s/;//g;s/string\[\]/string/g;s/any/string/g;s/EVMTransaction_Event\[\]/EVMTransaction_Event/g;p' | awk '{print $2}'))
        typemic=$(sed -En '/OmitType</{s/.*OmitType<([A-Za-z_]+).*/\1/p}' schema[$i].list )

        oldIFS=$IFS
        IFS='\'
        examplelist=($example)
        descriptionlist=($description)
        IFS=$oldIFS
        rm schema[$i].list

        propertycounter=1
        propertylen=${#propertylist[@]}
        patternmic="^[A-Z][a-zA-Z]+_RequestNoMic$"

        if [[ $class_name =~ $patternmic ]]
        then
           printf ' "%s":{\n' "$class_name"
           printf '\n "allOf":[{\n "$ref":"#/components/schemas/%s"}]\n'  "$typemic"
        else
             printf ' "%s":{\n "type":"object"\n,"properties":{' "$class_name"
            for j in "${!propertylist[@]}"
            do
                patternExclude="^[A-Z][a-zA-Z]+_Request$"
                if [[ "${propertylist[$j]}" == "messageIntegrityCode" ]] && [[ $class_name =~ $patternExclude ]]
                then
                    printf '\n "%s" : { \n "type": "%s", "readOnly": true' "${propertylist[$j]}" "${typelist[$j]}"
                else
                    printf '\n "%s" : { \n' "${propertylist[$j]}"
                    pattern="^[A-Z][a-zA-Z_]+"
                    if [[ ${typelist[$j]} =~ $pattern ]]
                    then
                        if [[ -z ${descriptionlist[$j]} ]]
                        then
                            printf '\n "allOf":[{\n "$ref":"#/components/schemas/%s"}]\n'  "${typelist[$j]}"
                        else
                            printf '"description":\n %s,\n "allOf":[{\n "$ref":"#/components/schemas/%s"}]\n' "${descriptionlist[$j]}" "${typelist[$j]}"
                        fi
                    else

                        printf ' "type": \n "%s"' "${typelist[$j]}"

                        if [[ ! -z ${descriptionlist[$j]} ]]
                        then
                            printf ', "description": %s' "${descriptionlist[$j]}"
                        fi
                        if [[ ! -z ${examplelist[$j]} ]]
                        then
                            printf ', "example": %s \n' "${examplelist[$j]}"
                        fi
                    fi
                fi
                    if [[ $propertycounter -ge $propertylen ]]
                    then
                        printf '\n}'
                    else
                        printf '\n}, '
                    fi
                    ((propertycounter+=1))

            done
            printf '\n}'
        fi
        if [[ $typeSchemaCounter -ge $typeSchemaLen ]]
        then
            printf '\n}'
        else
            printf '\n},'
        fi
        ((typeSchemaCounter+=1))
    done

}
(
# Output rest api header
printf '{ \n "openapi": "3.0.0",\n "info": {\n  "title": " %s",\n  "description": " ",\n  "version": "1.0", \n "contact": {}\n },\n "tags\": [],\n
  "servers": [{"url": "https://attestation-coston.flare.network"}],\n "paths": { \n ' "$title"
# Search for controller files.
if [[ $verifiertype == "evm" ]]
then
    controllerpath=($(find "$path" -name "*.controller.ts" ))
else
    controllerpath=($(find "$path" -name "$verifiertype*.controller.ts" ))
fi
filelen=${#controllerpath[@]}
loopcounter=1
for file in "${controllerpath[@]}"
do
    # Extract tags from code.
    apitag=$(sed -En 's/@ApiTags\("([A-Za-z]+)"\)/\1/p' "$file" )
    # Extract the name of the Controller.
    controllertag=$(sed -En 's/@Controller\("([A-Za-z/]+)"\)/\1/p' "$file")
    # Extract security type.
    securitytag=$(sed -En 's/@ApiSecurity\("([A-Za-z-]+)"\)/\1/p' "$file")
    # Extract API key.
    apiKeytype=$(sed -En 's/@UseGuards\(AuthGuard\("([A-Za-z-]+)"\)\)/\1/p' "$file")
    # Extract body of code between the class declaration
    requestBody=$(sed -En '/\/\*\*/,/\}$/ {
       s/}/\\/g;p
    }' "$file")

    # Change file seperator temporarily.
    oldIFS=$IFS
    IFS='\'
    # Split code body into array using new field separator.
    blocks=($requestBody)
    IFS=$oldIFS
    # Printing each block.
    blocklen=${#blocks[@]}
    for i in "${!blocks[@]}"
    do
        requestdescription=$(echo "${blocks[$i]}" | awk '/\* [a-zA-Z]+/{for(q=2; q <= NF; q++){printf("%s ",$q)}}')
        # Extract request method.
        requestmethod=$(echo "${blocks[$i]}" | sed -En '/Post|Get\(".*"\)/p')
        operationIdTag=$( echo  "${blocks[$i]}" | awk '$1 ~/async|public/{if($1=="async"){print $2} else{print $3}}' | awk 'BEGIN{FS="(" }{ print $1 }')
        # Strip request method of characters and convert to lower case.
        methodUpper=$(echo "$requestmethod" | sed -En 's/.*(Get|Post).*/\1/p')
        method=$(echo "$methodUpper" | tr '[:upper:]' '[:lower:]')
        # Extract request endpoint.
        endpoint=$(echo "$requestmethod" | sed -En 's/@Post\(|@Get\(/ /g; s/"/ /g; s/\)//g; s/:([a-zA-Z]+)/{\1}/g;p' | tr -d ' ')
        # Extract code body of a GET request.
        param=$(echo  "${blocks[$i]}" | sed -En '/@Param()|SystemStatus()|@Query()/p' )
        # Extract parameter name from a GET request.
        paramName=$(echo "$param" | sed -En 's/.*@Param\("([^"]*)".*/\1/p' )
        # Extract parameter type from a GET request.
        paramType=$(echo "$param" | sed -En 's/.* [a-zA-Z]+: ([A-Za-z_]+).*/\1/p')
        # Extract GET method response schema.
        getResponseSchema=$(echo "$param" | sed -En 's/ @ApiResponseWrapperDec\(SystemStatus\)/ /; s/.*Promise<ApiResponseWrapper<([^<>]*)\[\]>.*$/\1/g; s/.* Promise<ApiResponseWrapper<([^<>]*)>.*$/\1/;p' )
        # Extract code body of a POST request.
        body=$(echo  "${blocks[$i]}" | sed -En '/@Body()/p' )
        # Extract POST request schema.
        postRequestSchema=$(echo "$body" | sed -En 's/.* body: ([A-Za-z_]+).*/\1/g; s/.*[a-zA-Z]+: ([A-Za-z_]+).*/\1/g;p')
        # Extract Post response schema.
        postResponseSchema=$(echo "$body" | sed -En 's/.*Promise<([^>]*)> \{.*/\1/; s/.* Promise<ApiResponseWrapper<([^<>]*)>.*$/\1/;p')
        # Check if path contains parameter.
        if [[ $endpoint =~ "{" ]]
        then
            parameterlocation="path"
        fi
        verifier="VerifierController_"
        # Change request path, operation id if verifier type is proof.
        if [[ $verifiertype == "proof" ]]
        then
            verifiername="/attestation-client/"
            operationId="ProofController_$operationIdTag"
            verifierpath="$verifiername$controllertag/$endpoint"
        elif [[ $verifiertype == "evm" ]]
        then
            operationtag=$(echo "$controllertag" | awk 'BEGIN{ FS="/" }{ print $1}')
            evmtype=$(echo "$operationtag" | tr '[:lower:]' '[:upper:]' )
            operationId="$evmtype$apitag$verifier$operationIdTag"
            verifiername="/verifier/"
            verifierpath="$verifiername$controllertag/$endpoint"
        elif [[ $apitag == "Indexer" ]]
        then
            verifiername="/verifier/"
            verifier="Controller_"
            operationId="$typeUpperCase$apitag$verifier$operationIdTag"
            verifierpath="$verifiername$verifiertype/$controllertag/$endpoint"
        else
            verifiername="/verifier/"
            verifierpath="$verifiername$verifiertype/$controllertag/$endpoint"
            operationId="$typeUpperCase$apitag$verifier$operationIdTag"
        fi
        # Generate rest api path, method, request and response.
        checker="$i"
        ((checker+=1))
        if [[ $loopcounter -ge $filelen ]] &&  [[ $checker -ge $blocklen ]]
        then
            printf ' "%s":{\n "%s":{\n  "description": "%s", \n "operationId": "%s", \n' "$verifierpath" "$method" "$requestdescription" "$operationId"
            if [[ $method == "post" ]]
            then
                printf '"parameters":[],\n"requestBody": { \n "required": true,\n "description":" ",\n "content": { \n "application/json": { \n "schema": { \n "$ref": "#/components/schemas/%s"\n}\n} \n } \n },\n ' "$postRequestSchema"
                printf '"responses": {\n "200": { \n "description":" ",\n"content":{ \n "application/json":{\n "schema":{ "$ref": "#/components/schemas/%s" }\n}\n}\n}\n},\n' "$postResponseSchema"
            else
                if [[ -z $paramName ]]
                then
                    printf '"parameters": [],\n'
                else
                    printf '"parameters": [ \n { "name": "%s",\n"required": true, \n "in":"%s" ,\n  "schema": {\n "type": "%s" \n}\n}\n],' "$paramName" "$parameterlocation" "$paramType"
                fi
                if [[ -z $getResponseSchema ]]
                then
                    printf '"responses": { \n  "200": { "description":" "  }\n}, \n'
                else
                    printf ' "responses": { \n "200": { "description":" " }},\n'
                fi
            fi
            if [[ $verifiertype == "proof" ]]
            then
                printf '"tags": [ \n "%s"\n ] \n  ' "$apitag"
            else
                printf '"tags": [ \n "%s"\n ], \n  "security": [ \n{ "%s": [] \n }\n ]   ' "$apitag" "$securitytag"
            fi
            printf '}\n}'
        else
            printf ' "%s":{\n "%s":{\n  "description": "%s", \n   "operationId": "%s", \n' "$verifierpath" "$method" "$requestdescription" "$operationId"
            if [[ $method == "post" ]]
            then
                printf '"parameters":[],\n "requestBody": { \n "required": true,\n "description":" ",\n "content": { \n "application/json": { \n "schema": { \n "$ref": "#/components/schemas/%s"\n}\n} \n } \n },\n ' "$postRequestSchema"
                printf '"responses": {\n "200": { \n "description":" ",\n "content":{ \n "application/json":{\n "schema":{ "$ref": "#/components/schemas/%s" }\n}\n}\n}\n},\n' "$postResponseSchema"
            else
                if [[ -z $paramName ]]
                then
                    printf '"parameters": [],\n'
                else
                    printf '"parameters": [ \n { "name": "%s",\n"required": true, \n "in":"%s" ,\n  "schema": {\n "type": "%s" \n}\n}\n],' "$paramName" "$parameterlocation" "$paramType"
                fi
                if [[ -z $getResponseSchema ]]
                then
                   printf '"responses": { \n  "200": { "description":" "  }\n}, \n'
                else
                   printf ' "responses": { \n "200": { "description":" " }},\n'
                fi
            fi
            if [[ $verifiertype == "proof" ]]
            then
                printf '"tags": [ \n "%s"\n ] \n  ' "$apitag"
            else
                printf '"tags": [ \n "%s"\n ], \n  "security": [ \n{ "%s": [] \n }\n ]   ' "$apitag" "$securitytag"
            fi
            printf '}\n},'
        fi
    done
    ((loopcounter+=1))
done
printf "},\n"

# Generate component and schemas
if [[ $verifiertype == "proof" ]]
then
    proofSchemaPath="/src/servers/web-server/src/dtos"
    proofdto=($(find "$path$proofSchemaPath" -name "*.dto.ts"))
    printf '"components": { \n "schemas":{\n'
    cat "${proofdto[@]}"> proofdto.ts
    generate_schema proofdto.ts
    rm proofdto.ts
elif [[ $verifiertype == "evm" ]]
then
    evmdto="$path/src/dto/EVMTransaction.dto.ts"
    evmgeneric="$path/src/dto/generic.dto.ts"
    cat "$evmdto" "$evmgeneric" > allevmdto.ts
    printf '"components": { \n "securitySchemes": { \n "%s": {"type": "apiKey\",\n  "in": "header",\n
                            "name":"%s" \n }\n },\n "schemas":{ ' "$securitytag" "$securitytag"
    printf '"AttestationResponseStatus":{ \n "enum":[ "VALID","INVALID","INDETERMINATE"]},'
    generate_schema allevmdto.ts
    rm allevmdto.ts
else
    addressValidityDto=$path/src/servers/verifier-server/src/dtos/attestation-types/AddressValidity.dto.ts
    balanceDecreasingDto=$path/src/servers/verifier-server/src/dtos/attestation-types/BalanceDecreasingTransaction.dto.ts
    confirmedBlockDto=$path/src/servers/verifier-server/src/dtos/attestation-types/ConfirmedBlockHeightExists.dto.ts
    paymentDto=$path/src/servers/verifier-server/src/dtos/attestation-types/Payment.dto.ts
    referenceDto=$path/src/servers/verifier-server/src/dtos/attestation-types/ReferencedPaymentNonexistence.dto.ts
    genericDto=$path/src/servers/verifier-server/src/dtos/generic/generic.dto.ts
    cat "$genericDto" "$addressValidityDto" "$balanceDecreasingDto" "$confirmedBlockDto"  "$paymentDto"  "$referenceDto" > allDto.ts
    printf '"components": { \n "securitySchemes": { \n "%s": {"type": "apiKey\",\n  "in": "header",\n
                             "name":"%s" \n }\n },\n "schemas":{ ' "$securitytag" "$securitytag"
    printf '"AttestationResponseStatus":{ \n "enum":[ "VALID","INVALID","INDETERMINATE"]},'
    generate_schema allDto.ts
    rm  allDto.ts
fi

printf "\n } \n} \n}"
) | jq "."  > "$filename"-api.json

echo "Successfully generated $filename-api.json"