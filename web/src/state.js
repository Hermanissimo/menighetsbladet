export let currentData = {
    drivers: [],
    distributors: [],
    addresses: [],
    routes: []
  };
export function emptyFilterCriteria() {
    return {
      route: [],
      status: [],
      distributorName: [],
      driverName: [],
      postnr: [],
      active: [],
      address: [],
      onlyExcludedAddresses: false,
      onlyWithExcludedHouseholds: false
    };
  }

export let filterState = {
    drivers: emptyFilterCriteria(),
    distributors: emptyFilterCriteria(),
    addresses: emptyFilterCriteria(),
    routes: emptyFilterCriteria()
  };
export let filterComponents = {
    drivers: {},
    distributors: {},
    addresses: {},
    routes: {}
  };
export let editState = {
    mode: "edit",
    tableName: null,
    rowIndex: -1
  };
export let deleteState = {
    mode: "single",
    tableName: null,
    rowIndex: -1,
    rowIndexes: []
  };
export let batchStatusState = {
    tableName: null,
    rowIndexes: []
  };
export let batchRouteState = {
    tableName: null,
    rowIndexes: []
  };
export let batchSelectionState = {
    drivers: {},
    distributors: {},
    addresses: {},
    routes: {}
  };
export let sortState = {
    drivers: { key: "name", dir: 1 },
    distributors: { key: "name", dir: 1 },
    addresses: { key: "address", dir: 1 },
    routes: { key: "routeId", dir: 1 }
  };
export let paginationState = {
    drivers: { page: 1, pageSize: 25 },
    distributors: { page: 1, pageSize: 25 },
    addresses: { page: 1, pageSize: 25 },
    routes: { page: 1, pageSize: 25 }
  };
export let sortConfig = {
    drivers: {
      panelId: "panel-drivers",
      keys: ["name", "status", "driverNr", "phone", "email", "address", "postnr", "routeCount", "paperCount", null]
    },
    distributors: {
      panelId: "panel-distributors",
      keys: ["name", "status", "routes", "driverNr", "phone", "email", "address", "postnr", "extraPapers", "paperCount", null]
    },
    addresses: {
      panelId: "panel-addresses",
      keys: [null, "address", "route", "distributor", "numberOfHouseholds", "numberOfExcludedHouseholds", "postnr", "note", null]
    },
    routes: {
      panelId: "panel-routes",
      keys: [null, "routeId", "status", "distributorNames", "driver", "includedAddresses", "extraPapers", "paperCount", "addressRanges", "notes", null]
    }
  };
export let editFieldsByTable = {
    drivers: ["name", "status", "driverNr", "phone", "email", "address", "postnr", "extraPapers"],
    distributors: ["name", "status", "driverName", "routes", "phone", "email", "address", "postnr", "extraPapers"],
    addresses: ["address", "route", "numberOfHouseholds", "numberOfExcludedHouseholds", "postnr", "note"],
    routes: ["routeId", "status", "requiresDistributor", "distributor", "driver", "extraPapers", "notes"]
  };
export let addFieldsByTable = {
    drivers: ["name", "status", "driverNr", "phone", "email", "address", "postnr", "extraPapers"],
    distributors: ["name", "status", "driverName", "routes", "phone", "email", "address", "postnr", "extraPapers"],
    addresses: ["address", "route", "numberOfHouseholds", "numberOfExcludedHouseholds", "postnr", "note"],
    routes: ["routeId", "status", "requiresDistributor", "distributor", "driver", "extraPapers", "notes"]
  };
export let tableTitleKeys = {
    drivers: "driversTitle",
    distributors: "distributorsTitle",
    addresses: "addressesTitle",
    routes: "routesTitle"
  };
export let tableTitleSingleKeys = {
    drivers: "driverTitle",
    distributors: "distributorTitle",
    addresses: "addressTitle",
    routes: "routeTitle"
  };
export let fieldLabelKeyByTable = {
    drivers: {
      name: "driversColName",
      status: "driversColStatus",
      driverNr: "driversColDriverNo",
      phone: "driversColPhone",
      email: "driversColEmail",
      address: "driversColAddress",
      postnr: "driversColPostnr",
      routeCount: "driversColRouteCount",
      paperCount: "driversColPaperCount",
      extraPapers: "rowExtraPapers"
    },
    distributors: {
      name: "distColName",
      status: "distColStatus",
      routes: "distColRoute",
      driverNr: "distColDriverNo",
      driverName: "distColDriverNo",
      phone: "distColPhone",
      email: "distColEmail",
      address: "distColAddress",
      postnr: "distColPostnr",
      paperCount: "distColPaperCount",
      extraPapers: "rowExtraPapers"
    },
    addresses: {
      address: "addrColAddress",
      route: "addrColRoute",
      distributor: "addrColDistributor",
      numberOfHouseholds: "addrColHouseholds",
      numberOfExcludedHouseholds: "addrColExcludedHouseholds",
      postnr: "addrColPostnr",
      note: "addrColNote"
    },
    routes: {
      routeId: "routeColId",
      driverNr: "routeColDriverNr",
      driverName: "routeColDriverName",
      distributor: "routeColDistributor",
      driver: "routeColDriver",
      status: "distColStatus",
      requiresDistributor: "routeColRequiresDistributor",
      extraPapers: "rowExtraPapers",
      notes: "routeColNotes"
    }
  };
export let requiredFieldsByMode = {
    edit: {
      drivers: ["name"],
      distributors: ["name"],
      addresses: ["address"],
      routes: ["routeId"]
    },
    add: {
      drivers: ["name"],
      distributors: ["name"],
      addresses: ["address", "route"],
      routes: ["routeId"]
    }
  };

export let filterFieldMap = {
    drivers: {
      route: ["routes"],
      status: ["status"],
      distributorName: ["distributorName"],
      driverName: ["name"],
      postnr: ["postnr"]
    },
    distributors: {
      route: ["routes"],
      status: ["status"],
      distributorName: ["name"],
      driverName: ["driverName"],
      postnr: ["postnr"]
    },
    addresses: {
      address: ["address", "note"],
      route: ["route"],
      distributorName: ["distributor"],
      postnr: ["postnr"]
    },
    routes: {
      route: ["routeId"],
      status: ["status"],
      distributorName: ["distributorNames"],
      driverName: ["driver"],
      postnr: ["postnrs"]
    }
  };
