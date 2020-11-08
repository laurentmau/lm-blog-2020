EXTENSION="_"
DIRSRC="migration/1"
KEYWORDS="wp-content/uploads/ compfight Zemanta Blogsy"

echo "- - - - START - - - "
totUp=0
totLm=0
tot=0
for file in ${DIRSRC}/*/*.md ; do
    for k in $KEYWORDS ; do
        nb=`grep $k $file|wc -l`
        if [ $nb -gt 0 ]
        then

            totUp=`expr ${totUp} + 1`
        fi
    done

    nbUp=`grep "wp-content/uploads/" $file|wc -l`
    nbCf=`grep "compfight" $file|wc -l`
    nbLm=`grep -v "wp-content/uploads/" $file|grep -v compfight|grep laurentmaumet.com|wc -l`
    # echo "File : ${file}"
    # echo "Nb upload : ${nbUp}"
    # echo "Nb laurent : ${nbLm}"
    if [ $nbUp -gt 0 ]
    then

        totUp=`expr ${totUp} + 1`
    fi
    if [ $nbLm -gt 0 ]
    then
        totLm=`expr ${totLm} + 1`
    fi
    if [ $nbCf -gt 0 ]
    then
        totCf=`expr ${totCf} + 1`
    fi


    tot=`expr ${tot} + 1`

done


echo "Total         : ${tot}"
echo "Nb upload     :  ${totUp}"
echo "Nb Compfight  :  ${totCf}"
echo "Nb links      :  ${totLm}"

