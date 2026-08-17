var client 

function setup(){
    //mqtt er et objekt vi får fra mqtt bilbioteket i html siden 
    client = mqtt.connect('wss://mqtt.nextservices.dk')

    client.on('connect', msg => {
        //console.log(msg)
        var toast = select('#toast')
        console.log('Forbundet til NEXT MQTT server')
        select('#toast').html('Forbundet til NEXT MQTT server')
        select('#toast').addClass('toastShow')
        setTimeout(()=>{
            toast.removeClass('toastShow')
        }, 2000)
    })

    
    select('#bnt1').mousePressed(()=>{
        client.publish('sebasatian/page', '1')
    })
    select('#bnt2').mousePressed(()=>{
        client.publish('sebastian' ,'open')
    })
    
    select('#bnt3').mousePressed(()=>{
        client.publish('sebastian/page', '2')
    })
    

    client.publish()

}



