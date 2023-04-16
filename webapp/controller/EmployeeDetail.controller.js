sap.ui.define([
    "sap/ui/core/mvc/Controller"
    
], function(Controller) {
    'use strict';
    
    return Controller.extend("hexagon.editentitytestmatibtp.controller.EmployeeDetail", {

        onInit : function() {

            this._oComponent = this.getOwnerComponent();
            this._oRouter = this._oComponent.getRouter();

            this._oRouter.getRoute("employee").attachPatternMatched(this._onRouteMatched, this);
        },



        onBackMaster : function() {
            // TODO: Corregir bug vuelta atras
            this._oRouter.navTo("master", {}, true);
        },

        toggleFooter: function () {
			var oObjectPageLayout = this.byId("employeeDetailPageLayout");
			oObjectPageLayout.setShowFooter(!oObjectPageLayout.getShowFooter());
		},



        _onRouteMatched : function(oEvent) {

            var oPage = this.getView().byId('employeeDetailPageLayout');
            var sEmployeePath = oEvent.getParameter("arguments").id;

            oPage.bindElement({
                path: "/" + window.decodeURIComponent(sEmployeePath),
                model: "employees"
            });

            oPage.setShowFooter(false);
            // console.log("Binded");
        }

    })
});