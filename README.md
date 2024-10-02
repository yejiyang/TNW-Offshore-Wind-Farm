
# about

view geotiff files on a map with openlayers

# converting grd files to tiff files

convert .grd files in data_in/ to .tiff files in data/
requires gmt installed \
install gmt:
```
sudo apt-get install gmt
```
then run convert.sh (may need to restart terminal):
```
bash convert.sh
```

# running the app

run the commands:
```
npm install
npm run build
npm run start
```
then visit [http://localhost:3013](http://localhost:3013)