var mainSheet = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5GHLo24egJNhRxYYyyTEjNjYf79RWRs6Ntzwml9JvbDxU5y_H2gwZDhO_VgUWg1z6MMvEIeHIjJ7n/pubhtml';
function init() {
 Tabletop.init( { key: mainSheet,
 callback: function(data, tabletop) { 
 console.log(data)
 },
 simpleSheet: true } )
}
window.addEventListener(‘DOMContentLoaded’, init)
