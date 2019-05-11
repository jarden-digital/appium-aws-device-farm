# appium-aws-device-farm
Node library to schedule Appium test runs on AWS Device Farm

| Param | Description | Required | Type |
|---|---|---|---|
|**`androidAPKPath`**|Path to the android APK file|`true` if Android selected|`string`|
|**`androidDevicePoolARN`**|ARN of the AWS Device Pool used for Android tests|`true` if Android selected|`string`|
|**`appiumTestFolderPath`**|Path to the appium tests folder|`true`|`string`|
|**`appiumTestZipPath`**|Path where you wish the zip file to be created|`true`|`string`|
|**`iOSDevicePoolARN`**|ARN of the device pool used for iOS tests|`true` if iOS selected|`string`|
|**`iOSIPAPath`**|Path to the iOS IPA file|`true` if iOS selected|`string`|
|**`projectARN`**|ARN of the AWS Device Farm project|`true`|`string`|
|**`runNameIOS`**|Name of the iOS test run|`true` if iOS selected|`string`|
|**`runNameAndroid`**|Name of the Android test run|`true` if Android selected|`string`|
|**`testSpecAndroidARN`**|ARN of the test spec used for Android tests|`true` if Android selected|`string`|
|**`testSpecIOSARN`**|ARN of the test spec used for iOS tests|`true` if iOS selected|`string`|
