
    // Define the Boxever queue 
    var _boxeverq = _boxeverq || [];

    // Define the Boxever settings 
    var _boxever_settings = {
        client_key: 'klus01taib90pmh5tnf817nbmgiksmdg', // Replace with your client key
        target: 'https://api-us.boxever.com/v1.2', // Replace with your API target endpoint specific to your data center region
        cookie_domain: '.spin-burger-cdp.netlify.app/', // Replace with the top level cookie domain of the website that is being integrated e.g ".example.com" and not "www.example.com"
        javascriptLibraryVersion: '1.4.9', // Replace with the latest Boxever JavaScript Library version"
        pointOfSale: 'SpinBurgerCDP', // Replace with the same point of sale configured in system settings"
        web_flow_target: '', // Replace with path for the Amazon CloudFront CDN for Sitecore Personalize"
        web_flow_config: { async: false, defer: false } // Customize the async and defer script loading attributes
};
    // Import the Boxever JavaScript Library asynchronously 
    (function() {
         var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;  
         s.src = 'https://d1mj578wat5n4o.cloudfront.net/boxever-1.4.9.min.js';
         var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
    })();

    //function to trigger the IDENTITY event
function login(email) {
    _boxeverq.push(function () {
      var identityEvent = {
        browser_id: Boxever.getID(),
        channel: "WEB",
        type: "IDENTITY",
        language: "EN",
        currency: "USD",
        page: "homepage",
        pos: "SpinBurgerCDP",
        email: email,
        identifiers: [
            {
                provider: 'email',
                id: email,
            }
        ]
      };
      // Invoke event create
      // (<event msg>, <callback function>, <format>)
      console.log(identityEvent);
      Boxever.eventCreate(identityEvent, function (data) {}, "json");
    });
  }

  //function to ADD the product items to the cart and send to CDP
function sendAddEvent(
    productType,
    itemID,
    productName,
    productPrice,
    productID,
    productCurrency
  ) {
    _boxeverq.push(function () {
      var addEvent = {
        browser_id: Boxever.getID(),
        channel: "WEB",
        type: "ADD",
        language: "EN",
        currency: "USD",
        page: "homepage",
        pos: "SpinBurgerCDP",
        product: {
          type: productType,
          item_id: itemID,
          name: productName,
          orderedAt: new Date().toISOString(),
          quantity: 1,
          price: productPrice,
          productId: productID,
          currencyCode: productCurrency,
        },
      };
      // Invoke event create
      // (<event msg>, <callback function>, <format>)
      console.log(addEvent);
      Boxever.eventCreate(addEvent, function (data) {}, "json");
    });
  }
