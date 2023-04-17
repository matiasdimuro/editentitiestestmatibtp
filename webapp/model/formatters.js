sap.ui.define([
    
], function() {
    'use strict';
    
    return {
        
        verifyEmptyData : function (sData) {
            const sBlankChar = "";
            return ((sData === sBlankChar) || (sData === null)) ? "-" : sData;
        }
    }
});