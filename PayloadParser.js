function DIOVal(strValue)
{

    switch (strValue)
    {
        case 'H': return 1;
        case 'L': return 0;
    }
    
}

function ROVal(strValue)
{

    switch (strValue)
    {
        case 'OFF': return 0;
        case 'ON': return 1;
    }
    
}

function parseUplink(device, payload)
{
    var parsed = payload.asParsedObject();
    env.log(parsed);    

    // Store ACI1_mA
    if(parsed.ACI1_mA != null){
        var ai1 = device.endpoints.byAddress("1");

        if (ai1 != null)
            ai1.updateGenericSensorStatus(Math.round((((parsed.ACI1_mA)-4)* 4.2464)*10)/10);
    };
    
    if(parsed.ACI2_mA != null){
        var ai2 = device.endpoints.byAddress("2");

        if (ai2 != null)
            ai2.updateGenericSensorStatus(parsed.ACI2_mA);
    };
    
    if(parsed.AVI1_V != null){
        var av1 = device.endpoints.byAddress("3");

        if (av1 != null)
            av1.updateGenericSensorStatus(parsed.AVI1_V);
    };
    
    if(parsed.AVI2_V != null){
        var av2 = device.endpoints.byAddress("4");

        if (av2 != null)
            av2.updateGenericSensorStatus((Math.round((parsed.AVI2_V)*11.7333333)*10)/10);
    };

    if(parsed.DI1_status!= null){
        var di1 = device.endpoints.byAddress("5");

        if (di1 != null)
            di1.updateGenericSensorStatus(DIOVal(parsed.DI1_status));
    };

    if(parsed.DI2_status!= null){
        var di2 = device.endpoints.byAddress("6");

        if (di2 != null)
            di2.updateGenericSensorStatus(DIOVal(parsed.DI2_status));
    };

    if(parsed.DO1_status!= null){
        var do1 = device.endpoints.byAddress("7");

        if (do1 != null)
            do1.updateApplianceStatus(DIOVal(parsed.DO1_status) != 0);
    };

    if(parsed.DO2_status!= null){
        var do2 = device.endpoints.byAddress("8");

        if (do2 != null)
            do2.updateApplianceStatus(DIOVal(parsed.DO2_status) != 0);
    };

    if(parsed.RO1_status!= null){
        var ro1 = device.endpoints.byAddress("9");

        if (ro1 != null)
            ro1.updateApplianceStatus(ROVal(parsed.RO1_status) != 0);
    };

    if(parsed.RO2_status!= null){
        var ro2 = device.endpoints.byAddress("10");

        if (ro2 != null)
            ro2.updateApplianceStatus(ROVal(parsed.RO2_status) != 0);
    }

}


/*
        "ACI1_mA": 0,
        "ACI2_mA": 0,
        "AVI1_V": 0,
        "AVI2_V": 0,
        "DI1_status": "H",
        "DI2_status": "H",
        "DO1_status": "H",
        "DO2_status": "H",
        "Hardware_mode": "LT22222",
        "RO1_status": "OFF",
        "RO2_status": "OFF",
        "Work_mode": "2ACI+2AVI"
*/

function buildDownlink(device, endpoint, command, payload) 
{ 
	// This function allows you to convert a command from the platform 
	// into a payload to be sent to the device.
	// Learn more at https://wiki.cloud.studio/page/200

	// The parameters in this function are:
	// - device: object representing the device to which the command will
	//   be sent. 
	// - endpoint: endpoint object representing the endpoint to which the 
	//   command will be sent. May be null if the command is to be sent to 
	//   the device, and not to an individual endpoint within the device.
	// - command: object containing the command that needs to be sent. More
	//   information at https://wiki.cloud.studio/page/1195.

	// This example is written assuming a device that contains a single endpoint, 
	// of type appliance, that can be turned on, off, and toggled. 
	// It is assumed that a single byte must be sent in the payload, 
	// which indicates the type of operation.

    payload.port = 1; 	 	 // This device receives commands on LoRaWAN port 1
	payload.buildResult = downlinkBuildResult.ok; 

	switch (command.type) { 
	 	case commandType.onOff: 
	 	 	switch (command.onOff.type) { 
	 	 	 	case onOffCommandType.turnOn:
                    if (endpoint == null) 
                    {
	 	 	 	 	    payload.buildResult = downlinkBuildResult.unsupported; 
                    }
                    else 
                    {
                        if (endpoint.address == "9")
                        {
                            payload.setAsBytes([0x03, 0x01, 0x11])
                        }
                        else if (endpoint.address == "10")
                        {
                            payload.setAsBytes([0x03, 0x11, 0x01])
                        }
                        else 
                        {
        	 	 	 	 	payload.buildResult = downlinkBuildResult.unsupported; 
                        }
                    }
	 	 	 	 	break; 
	 	 	 	case onOffCommandType.turnOff: 
                    if (endpoint == null) 
                    {
	 	 	 	 	    payload.buildResult = downlinkBuildResult.unsupported; 
                    }
                    else 
                    {
                        if (endpoint.address == "9") 
                        {
                            payload.setAsBytes([0x03, 0x00, 0x11])
                        }
                        else if (endpoint.address == "10") 
                        {
                            payload.setAsBytes([0x03, 0x11, 0x00])
                        }
                        else 
                        {
        	 	 	 	 	payload.buildResult = downlinkBuildResult.unsupported; 
                        }
                    }
	 	 	 	 	break; 
	 	 	 	case onOffCommandType.toggle: 
	 	 	 	 	payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 	 	break; 
	 	 	 	default: 
	 	 	 	 	payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 	 	break; 
	 	 	} 
	 	 	break; 
	 	 default: 
	 	 	payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	break; 
	 }

}