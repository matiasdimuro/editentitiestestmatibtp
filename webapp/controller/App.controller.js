// sap.ui.define([
//     "sap/ui/core/mvc/Controller"
// ],
//     /**
//      * @param {typeof sap.ui.core.mvc.Controller} Controller
//      */
//     function (Controller) {
//         "use strict";

//         return Controller.extend("hexagon.editentitytestmatibtp.controller.App", {
//             onInit: function () {

//             }
//         });
//     });

sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/Device",
	"sap/base/Log"
], function (MessageToast, Controller, Device, Log) {
	"use strict";

	return Controller.extend("sap.m.sample.SplitApp.C", {

		onInit: function () {
			this.getSplitAppObj().setHomeIcon({
				'phone': 'phone-icon.png',
				'tablet': 'tablet-icon.png',
				'icon': 'desktop.ico'
			});

			Device.orientation.attachHandler(this.onOrientationChange, this);
		},

		onExit: function () {
			Device.orientation.detachHandler(this.onOrientationChange, this);
		},

		onOrientationChange: function (mParams) {
			var sMsg = "Orientation now is: " + (mParams.landscape ? "Landscape" : "Portrait");
			MessageToast.show(sMsg, { duration: 5000 });
		},

        // Ir hasta otro detalle. Como el evento proviene de un detalle, se omite el
        // "Detail" luego del "to"
		onPressNavToDetail: function () {
			this.getSplitAppObj().to(this.createId("detailDetail"));
            debugger;
		},

        // Retrocede en el Detail
		onPressDetailBack: function () {
			this.getSplitAppObj().backDetail();
		},

        // Volver un paso atras
		onPressMasterBack: function () {
			this.getSplitAppObj().backMaster();
		},

        // Crear un id y mostrar tal elemento.
		onPressGoToMaster: function () {
			this.getSplitAppObj().toMaster(this.createId("master2"));
            debugger;
		},

        // Obtener el detalle al que apunta y setearlo.
		onListItemPress: function (oEvent) {
			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();
            debugger;

			this.getSplitAppObj().toDetail(this.createId(sToPageId));
		},

		onPressModeBtn: function (oEvent) {
			var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();

			this.getSplitAppObj().setMode(sSplitAppMode);
			MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, { duration: 5000 });
		},

        // Get the Split Object
		getSplitAppObj: function () {
			var result = this.byId("SplitAppDemo");
			if (!result) {
				Log.info("SplitApp object can't be found");
			}
			return result;
		}

	});
});