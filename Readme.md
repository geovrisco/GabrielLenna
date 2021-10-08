#Penggunaan

```
npm i
(ios) install the pod dependences
npx react-native run-android (kalau di mac jangan lupa local.properties)
npx react-native run-ios
```

apk demo di /apks

## catatan

### 1 react-native-voice

karena react-native-voice (dependensi untuk react-native dialogflow) pakai android.support.annotation.NonNull sementara di RN 6x.x pakai androidx jadi di bakal error pas bikin apk.
fix :
ganti import android.support.annotation.NonNull jadi androidx.annotation.NonNull di nodemodules atau di build.gradle

```

task fixReactNativeVoiceImport() {
    def libModule = file("../../node_modules/react-native-voice/android/src/main/java/com/wenkesj/voice/VoiceModule.java")
    def fixedText = libModule.text.replace('android.support.annotation.NonNull', 'androidx.annotation.NonNull')
    libModule.write(fixedText)
}

```

### 2 react-native-dialogflow

untuk build gradlew app:assembleRelease
