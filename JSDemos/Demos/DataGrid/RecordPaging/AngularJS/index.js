const DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', ($scope) => {
  $scope.dataGridOptions = {
    dataSource: generateData(100000),
    keyExpr: 'id',
    showBorders: true,
    customizeColumns(columns) {
      columns[0].width = 70;
    },
    scrolling: {
      rowRenderingMode: 'virtual',
    },
    paging: {
      pageSize: 10,
    },
    pager: {
      visible: true,
      allowedPageSizes: [5, 10, 'all'],
      showPageSizeSelector: true,
      showInfo: true,
      showNavigationButtons: true,
    },
    onInitialized(e) {
      $scope.dataGrid = e.component;
    },
  };
  $scope.displayModeOptions = {
    items: [{ text: "Display Mode 'full'", value: 'full' }, { text: "Display Mode 'compact'", value: 'compact' }],
    displayExpr: 'text',
    valueExpr: 'value',
    value: 'full',
    onValueChanged(data) {
      $scope.dataGrid.option('pager.displayMode', data.value);
      $scope.pageInfo.option('disabled', data.value === 'compact');
      $scope.navButtons.option('disabled', data.value === 'compact');
    },
  };
  $scope.showPageSizesOptions = {
    text: 'Show Page Size Selector',
    value: true,
    onValueChanged(data) {
      $scope.dataGrid.option('pager.showPageSizeSelector', data.value);
    },
  };
  $scope.showInfoOptions = {
    text: 'Show Info Text',
    value: true,
    onValueChanged(data) {
      $scope.dataGrid.option('pager.showInfo', data.value);
    },
    onInitialized(e) {
      $scope.pageInfo = e.component;
    },
  };
  $scope.showNavButtonsOptions = {
    text: 'Show Navigation Buttons',
    value: true,
    onValueChanged(data) {
      $scope.dataGrid.option('pager.showNavigationButtons', data.value);
    },
    onInitialized(e) {
      $scope.navButtons = e.component;
    },
  };
});
