sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "../model/formatters"
    
], function(Controller, Fragment, MessageToast, formatters) {
    'use strict';
    
    return Controller.extend("hexagon.editentitytestmatibtp.controller.EmployeeDetail", {

        formatters : formatters,

        onInit : function() {

            this._oComponent = this.getOwnerComponent();
            this._oRouter = this._oComponent.getRouter();
            this._detailFragments = {};

            this._oRouter.getRoute("employee").attachPatternMatched(this._onRouteMatched, this);
        },



        onBackMaster : function() {
            // TODO: Corregir bug vuelta atras
            this._oRouter.navTo("master", {}, true);
        },

        onEdit : function() {

            const sEditFragmentId = "EditEmployeeData";
            this._toggleDetailFragment(sEditFragmentId);
        },

        onDisplay : function() {

            // !oObjectPageLayout.getShowFooter()
            const sEditFragmentId = "EditEmployeeData";
            var oObjectPageLayout = Fragment.byId(sEditFragmentId, "employeeDetailPageLayout");
			oObjectPageLayout.setShowFooter(true);
        },

        onSaveChanges : function() {

            const sDisplayFragmentId = "DisplayEmployeeData";
            this._toggleDetailFragment(sDisplayFragmentId);

            const sEditFragmentId = "EditEmployeeData";
            var oObjectPageLayout = Fragment.byId(sEditFragmentId, "employeeDetailPageLayout");
			oObjectPageLayout.setShowFooter(false);

            MessageToast.show("Changes saved!");
        },

        onCancelChanges : function() {

            const sDisplayFragmentId = "DisplayEmployeeData";
            this._toggleDetailFragment(sDisplayFragmentId);

            const sEditFragmentId = "EditEmployeeData";
            var oObjectPageLayout = Fragment.byId(sEditFragmentId, "employeeDetailPageLayout");
			oObjectPageLayout.setShowFooter(false);
            
            MessageToast.show("Changes were not saved!");
        },



        _onRouteMatched : function(oEvent) {

            var oPage = this.getView().byId('employeeDetailPage');
            // var sEmployeePath = oEvent.getParameter("arguments").id;

            // oPage.bindElement({
            //     path: "/" + window.decodeURIComponent(sEmployeePath),
            //     model: "employees"
            // });

            var nEmployeeID = oEvent.getParameter("arguments").id;

            oPage.bindElement({
                path: "/Employees(" + nEmployeeID + ")",
                model: "nwEntities"
            });

            const sDisplayFragmentId = "DisplayEmployeeData";
			this._toggleDetailFragment(sDisplayFragmentId);
        },



        _toggleDetailFragment : function (sFragmentName) {

			var oPage = this.getView().byId("employeeDetailPage");
			oPage.removeAllContent();
            
            var oView = this.getView();
            var oDetailFragment = this._detailFragments[sFragmentName];

            
            if (oDetailFragment === undefined) {

				Fragment.load({
					id: sFragmentName,
					name: "hexagon.editentitytestmatibtp.view." + sFragmentName,
                    controller: this
				})

                .then(function(oFragment) {
                    oView.addDependent(oFragment);
                    oPage.insertContent(oFragment);
                    this._detailFragments[sFragmentName] = oFragment;
                }.bind(this));
			}

            else {
                oPage.insertContent(oDetailFragment);
            }
		},

    })
});