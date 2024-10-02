# convert all .grd files in directoryIn to .tif files in directoryOut

directoryIn="data_in"
directoryOut="data"

# Projection of the input .grd files
projIn="EPSG:25831"
# Ignore projection in input file and use projIn instead
projInOverride=1
# Leave empty to keep original projection
projOut="EPSG:4326"

conv()
{
    local relFilePath=$1
    local pathOutBase="${directoryOut}/${relFilePath%.*}"
    local pathOutTmp="${pathOutBase}.grd.tmp"
    local pathOutTif="${pathOutBase}.tif"
    local pathIn="${directoryIn}/${relFilePath}"

    echo "Processing ${relFilePath}"

    local target=$pathIn

    if [ $projInOverride == 1 ]; then
        gmt grdedit $target -G"${pathOutTmp}" -J"${projIn}" -C
        target=$pathOutTmp
    fi

    gmt grdproject $target -G"${pathOutTmp}" -J"${projIn}" -I
    target=$pathOutTmp

    if [ $projOut != "" ]; then
        gmt grdproject $target -G"${pathOutTmp}" -J"${projOut}" -I
        target=$pathOutTmp
    fi

    gmt "grdimage" $target -A"${pathOutTif}" -Jx1
    rm $pathOutTmp
}

if [ ! -d $directoryOut ]; then
    mkdir $directoryOut
fi

for file in $(ls ${directoryIn}/*.grd) ; do
    conv $(basename $file)
done
