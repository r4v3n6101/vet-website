function loadCatalog(region) {
    $.get('/catalog', {region: region}, function (data) {
        let body = data.replace(/^.*?<body>(.*?)<\/body>.*?$/s, "$1");
        let placeholder = $('.catalog_placeholder');
        placeholder.empty();
        placeholder.append(body);
    });
}

$(function () {
    let regions = $('.region_button > *[name="region"]');
    loadCatalog(regions.filter(':checked').val());

    regions.change(function () {
        let region = $(this).val();
        loadCatalog(region);
    });
});