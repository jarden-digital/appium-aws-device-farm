interface ParamsType {
  androidAPKPath?: string
  androidDevicePoolARN?: string
  appiumTestFolderPath: string
  appiumTestZipPath: string
  iOSDevicePoolARN?: string
  iOSIPAPath?: string
  projectARN: string
  runNameIOS?: string
  runNameAndroid?: string
  testSpecAndroidARN?: string
  testSpecIOSARN?: string
  verbose?: boolean
}

export function launchAppiumTestsDeviceFarm(params: ParamsType): void