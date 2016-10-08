$.noty.themes.notyEhrTheme = {
    name    : 'notyEhrTheme',
    helpers : {},
    modal   : {
        css: {
            position       : 'fixed',
            width          : '100%',
            height         : '100%',
            zIndex         : 10000,
            opacity        : 0.9,
            display        : 'none',
            left           : 0,
            top            : 0
        }
    },
    style   : function() {

        this.$bar.css({
            overflow    : 'hidden',
            margin      : '4px 0',
            borderRadius: '1px'
        });

        this.$message.css({
            fontSize  : '16px',
            lineHeight: '16px',
            textAlign : 'left',
            padding   : '10px',
            width     : 'auto',
            position  : 'relative'
        });

        this.$closeButton.css({
            position  : 'absolute',
            top       : 4, right: 4,
            width     : 10, height: 10,
            background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAxUlEQVR4AR3MPUoDURSA0e++uSkkOxC3IAOWNtaCIDaChfgXBMEZbQRByxCwk+BasgQRZLSYoLgDQbARxry8nyumPcVRKDfd0Aa8AsgDv1zp6pYd5jWOwhvebRTbzNNEw5BSsIpsj/kurQBnmk7sIFcCF5yyZPDRG6trQhujXYosaFoc+2f1MJ89uc76IND6F9BvlXUdpb6xwD2+4q3me3bysiHvtLYrUJto7PD/ve7LNHxSg/woN2kSz4txasBdhyiz3ugPGetTjm3XRokAAAAASUVORK5CYII=)",
            display   : 'none',
            cursor    : 'pointer'
        });

        this.$buttons.css({
            padding        : 5,
            textAlign      : 'right',
            borderTop      : '1px solid #ccc',
            backgroundColor: '#fff'
        });

        this.$buttons.find('button').css({
            marginLeft: 5
        });

        this.$buttons.find('button:first').css({
            marginLeft: 0
        });

        this.$bar.on({
            mouseenter: function() {
                $(this).find('.noty_close').stop().fadeTo('normal', 1);
            },
            mouseleave: function() {
                $(this).find('.noty_close').stop().fadeTo('normal', 0);
            }
        });



        switch(this.options.type) {
            case 'warning':
                this.$bar.css({backgroundColor: '#3498db', borderColor: '#FFC237', color: '#ffffff'});
                this.$buttons.css({borderTop: '1px solid #FFC237'});
                break;
            case 'error':
                this.$bar.css({backgroundColor: '#e74c3c', borderColor: '#e25353'});
                this.$message.css({color: '#ffffff',fontSize: '16px'});
                break;
            case 'success':
                this.$bar.css({backgroundColor: '#1abc9c', borderColor: '#7cdd77', color: '#ffffff'});
                this.$message.css({fontSize:'16px'});
                break;
            default:
                this.$bar.css({backgroundColor: '#34495e', borderColor: '#CCC', color: '#ffffff'});
                break;
        }
    },
    callback: {
        onShow : function() {

        },
        onClose: function() {

        }
    }
};