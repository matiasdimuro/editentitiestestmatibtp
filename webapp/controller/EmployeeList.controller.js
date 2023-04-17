sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
    
], function(Controller, Fragment, MessageToast, Filter, FilterOperator) {
    'use strict';
    
    return Controller.extend("hexagon.editentitytestmatibtp.controller.EmployeeList", {

        onInit : function() {

            this._oComponent = this.getOwnerComponent();
            this._oRouter = this._oComponent.getRouter();

            this._onShowLoadDataDialog();

            var sODataModel = "nwEntities";
            var oODataModel = this._oComponent.getModel(sODataModel);

            var sJsonModel = "employees";
            var oJsonModel = this._oComponent.getModel(sJsonModel);

            oODataModel.read("/Employees", {

                success: function(oData) {
                    oJsonModel.setData(oData);
                    this._oDialog.close();
                }.bind(this),

                error: function(err) {
                    console.log(err);
                    this._oDialog.close();
                }
            });
        },


        onSeeEmployeeDetail : function(oEvent) {

            var oItem = oEvent.getSource();
            var oBindingContext = oItem.getBindingContext("employees");

            var sEmployeePath = oBindingContext.getPath();

            this._oRouter.navTo("employee", {
                id: window.encodeURIComponent(sEmployeePath.substr(1))
            });

            MessageToast.show("See employee details");
        },


        onSearch : function (oEvent) {
            
            var sInput = oEvent.getParameter("query");
            var sBlankSpace = " ";
            var aNames = sInput.trim().split(sBlankSpace);

            var aFilter = [];

            if (aNames.length > 0) {

                var oFilterFirstName = new Filter("FirstName", FilterOperator.Contains, aNames[0]);                
                var oFilterLastName = new Filter("LastName", FilterOperator.Contains, aNames[0]) ;
                
                var aFilters = new Filter([oFilterFirstName, oFilterLastName], false);
                aFilter.push(aFilters);
            }

            if (aNames.length > 1) {
                var oFilterLastName = new Filter("LastName", FilterOperator.Contains, aNames[1]) ;
                aFilter.push(oFilterLastName)
            }

            var sODataModel = "nwEntities";
            var oODataModel = this._oComponent.getModel(sODataModel);

            var sJsonModel = "employees";
            var oJsonModel = this._oComponent.getModel(sJsonModel);

            this.getView().setBusy(true);
            oODataModel.read("/Employees", {

                filters: aFilter,

                success: function(oData) {
                    oJsonModel.setData(oData);
                    this.getView().setBusy(false);
                }.bind(this),

                error: function(err) {
                    console.log(err);
                    this.getView().setBusy(false);
                }
            });

            console.log("Search");
        },


        _onShowLoadDataDialog : function () {
            
            if (!this._oDialog) { 

                Fragment.load({ 
                    name: "hexagon.editentitytestmatibtp.view.LoadData"
                })

                .then(function(oDialog) {
                    this._oDialog = oDialog; 
                    this.getView().addDependent(oDialog); 
                    this._oDialog.open(); 
                }.bind(this)); 
            
            } else { 
                this._oDialog.open(); 
            }
        },


        _getSplitAppObj : function() {

            // var sSplitAppId = this.getView().getParent().getParent().getId();
            return this.getView().getParent().getParent();
        }

    })
});