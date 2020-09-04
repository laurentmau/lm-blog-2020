EXTENSION="_"
DIRSRC="posts_bulk"
DIRDEST="src/posts"

echo "- - - - START OF POSTS PRE PROCESSING - - - "

rm ${DIRDEST}/*


for file in ${DIRSRC}/*.md ; do
    #echo "$(basename "$file")"
    #echo $file
    nf="${DIRDEST}/$(basename "$file")"
    echo "---" > ${nf}
    input=$file
    heading="NOTYET"
    while IFS= read -r line
    do
        #echo $line
        if [ $heading = "YES" ]
        then
            keyword="${line%%:*}"
            #echo $keyword
            case ${keyword} in
                "date")
                    headerdate="${line//\//-}"
                ;;
               "title")
                    headertitle="title: \"${line##*: }\""     #  "\"${line/\#/title:\"}\""
                ;;
                "draft")
                    headerdraft="${line/\#/title:\"}"
                ;;
                "tags")
                    tags="${line##*: }"
                    #echo $tags
                    listtags=[\""${tags//, /\",\"}"\"]
                    headertags="tags: ${listtags}"
                ;;
                "---")

                    heading="NO"
                    #echo "On insere dans "${nf}
                    echo $headertitle >> ${nf}
                    echo $headerdate >> ${nf}
                   # echo $headertags >> ${nf}
                    echo $headerdraft >> ${nf}
                    echo "layout: layouts/post.njk" >> ${nf}
                    echo "tags: posts"  >> ${nf}
                    echo "---" >> ${nf}
                ;;
            esac

        else
           if [ $heading = "NOTYET" ]
           then
            heading="YES"
            else
            echo "$line">> ${nf}
            fi
        fi


    done < "$input"

done

echo "- - - - END OF POSTS PRE PROCESSING - - - "

exit 0
