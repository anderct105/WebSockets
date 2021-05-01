const serverURL = window.location.hostname + ":" +  window.location.port;

export default function() {

    const socket = io.connect(serverURL, {secure: true});
    // register phone connection
    socket.emit('desktop-connect');

    socket.on('phone-move', function (data) {
        if (data.beta > 0) {
            window.dispatchEvent(
                new KeyboardEvent('keydown',
                    {code: 'ArrowRight'
                    })
            );
        } else if (data.beta === 0) {
            window.dispatchEvent(
                new KeyboardEvent('keyup',
                    {code: 'ArrowRight'
                    })
            );
            window.dispatchEvent(
                new KeyboardEvent('keyup',
                    {code: 'ArrowLeft'
                    })
            );
        } else {
            window.dispatchEvent(
                new KeyboardEvent('keydown',
                    {code: 'ArrowLeft'
                    })
            );
        }
    });
}