sap.ui.define([
    "sap/ui/core/mvc/Controller"
    
], function(Controller) {
    'use strict';
    
    return Controller.extend("hexagon.editentitytestmatibtp.controller.EmployeeDetail", {

        onInit : function() {

            this._oComponent = this.getOwnerComponent();
            this._oRouter = this._oComponent.getRouter();

            this._oRouter.getRoute("main").attachPatternMatched(this._onRouteMatched, this);

            console.log("aas")
        },


        _onRouteMatched : function(oEvent) {

            var oPage = this.getView().byId('employeeDetailPage');
            var sEmployeePath = oEvent.getParameter("arguments").id;

            oPage.bindElement({
                path: "/" + window.decodeURIComponent(sEmployeePath),
                model: "employees"
            });
        }

    })
});