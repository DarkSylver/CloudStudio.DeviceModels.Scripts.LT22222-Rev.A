function getConfiguration(config)
{
  // This function allows you to indicate general configuration values
  // for all devices of this model.

  // Depending on the meaning of the "device address" in this device, 
  // you may want to change the label that is used to refer to the 
  // address in the user interface.
  // For instance, if the address of the device is actually a MAC 
  // address, you may want to use the code below.
  
  config.addressLabel = {en: "DevEUI", es: "DevEUI"};
}

function getEndpoints(deviceAddress, endpoints)
{

    var ACI1_mA = endpoints.addEndpoint("1", " Analog Current Input 1 ", endpointType.genericSensor);
    ACI1_mA.variableTypeId = 1196;

    var ACI2_mA = endpoints.addEndpoint("2", " Analog Current Input 2 ", endpointType.genericSensor);
    ACI2_mA.variableTypeId = 1196;

    var AVI1_V = endpoints.addEndpoint("3", " Analog Voltage Input 1 ", endpointType.genericSensor);
    AVI1_V.variableTypeId = 1197;

    var AVI2_V = endpoints.addEndpoint("4", "Analog Voltage Input 2", endpointType.genericSensor);
    AVI2_V.variableTypeId = 1197;

    var di1 = endpoints.addEndpoint("5", "DI1_status", endpointType.genericSensor);
    di1.variableTypeId = 1208;

    var di2 = endpoints.addEndpoint("6", "DI2_status", endpointType.genericSensor);
    di2.variableTypeId = 1208;

    var do1 = endpoints.addEndpoint("7", "DO1_status", endpointType.appliance);

    var do2 = endpoints.addEndpoint("8", "DO2_status", endpointType.appliance);

    var ro1 = endpoints.addEndpoint("9", "RO1_status", endpointType.appliance);

    var ro2 = endpoints.addEndpoint("10",  "RO2_status", endpointType.appliance);
}


function validateDeviceAddress(address, result)
{
  // This function allows you to validate the address of a device, when
  // the user is creating it. If your device has special validation rules
  // for the address, you can check them here, and return an error message
  // in case the address format is incorrect.

  // In the code below, a validation is made to ensure that the address 
  // is exactly 10 characters long.
  
  // if (address.length != 10) {
  //   result.ok = false;
  //   result.errorMessage = {
  //     en: "The address must be 10 characters long", 
  //     es: "La dirección debe tener exactamente 10 caracteres"
  //   };
  // }
}

function updateDeviceUIRules(device, rules)
{
  // This function allows you to specify UI rules at the device level.
  // For instance, you can make it possible to enable or disable adding
  // endpoints manually to the device after it was created.
  
  // In the code below, adding endpoints manually is disabled in the
  // user interface. This means that the device will be limited to the 
  // endpoints defined by function getEndpoints() above.
  
  rules.canCreateEndpoints = true;
}

function updateEndpointUIRules(endpoint, rules)
{
  // This function allows you to specify UI rules at the endpoint level.
  // For instance, you can make it possible to delete certain endpoints, 
  // or edit their endpoint subtype, if applicable.

  // In the code below, the following rules are defined:
  // - Endpoints cannot be deleted.
  // - The endpoint subtype can be changed, but only for the second 
  //   endpoint.
  
  // rules.canDelete = false;
  // rules.canEditSubType = (endpoint.address == "2");
}
