# appium-aws-device-farm
Node library to schedule Appium test runs on AWS Device Farm

| Param | Description | Required | Type |
|---|---|---|---|
|**`androidAPKPath`**|Path to the android APK file|`true` if Android selected|`string`|
|**`androidDevicePoolARN`**|ARN of the AWS Device Pool used for Android tests|`true` if Android selected|`string`|

|**`appiumTestFolderPath`**|Path to the appium tests folder|`true`|`string`|

|**`iOSDevicePoolARN`**|ARN of the device pool used for iOS tests|`true` if iOS selected|`string`|
|**`iOSIPAPath`**|Path to the iOS IPA file|`true` if iOS selected|`string`|
|**`projectARN`**|ARN of the AWS Device Farm project|`true`|`string`|
|**`testSpecAndroidARN`**|ARN of the test spec used for Android tests|`true` if Android selected|`string`|
|**`testSpecIOSARN`**|ARN of the test spec used for iOS tests|`true` if iOS selected|`string`|



Steps:

  push_to_aws:
    docker:
      - image: node:11.4
    working_directory: ~/build-root

    steps:
      - checkout
      - attach_workspace:
          at: ~/build-root
      - run:
          name: bundle the tests
          command: |
            cd ./appium-tests
            npm install --global npm-bundle
            npm-bundle

      - run:
          name: package the tests
          command: |
            cd ./aws-appium
            yarn install
            node ./package.js

      - store_artifacts:
          path: ./appium-tests/appium-tests-1.0.0.tgz

      - store_artifacts:
          path: ./aws-appium/AppiumTests.zip

      - run:
          name: send files to AWS
          command: |
            cd ./aws-appium
            yarn install
            node ./sendFilesToAws.js
