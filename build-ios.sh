npx expo prebuild --clean --platform ios
cd ios
pod deintegrate
pod cache clean --all
#rm -rf derived data
pod install