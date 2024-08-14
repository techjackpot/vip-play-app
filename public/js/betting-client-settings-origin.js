(function (global) {
  //---------------------------------------------------------------------
  //
  //  Public methods
  //
  //---------------------------------------------------------------------
  /**
   * Client settings object which provides settings properties and functions
   * for which the Kambi application will integrate with.
   *
   * Notes:
   * - Unless specified, data must be returned synchronously.
   * - If multiple languages are supported, a betting-client-settings file must be
   *      created and translated for each language. The operator's index HTML
   *      page must return the correct translated settings file.
   *
   * @class CustomerSettings
   */
  var CustomerSettings = function () {
      /**
       * The URL location to redirect to when the user clicks on the
       * operator's logo in the header. This URL can be an absolute URL or
       * a relative URL which is relative to the HTML file.
       *
       * @type String
       * @default undefined
       */
      this.homeUrl = undefined;
      /**
       * The URL location to redirect to when the user clicks on the
       * login button in the header. This URL can be an absolute URL or
       * a relative URL which is relative to the HTML file.
       * 
       * A special case: Setting this.loginUrl = 'notification' will 
       * prevent a redirect and instead the Kambi client sends a 
       * notification event 'loginRequested'. 
       * see https://www.kambipartner.com/techhub/api_docs/gen_doc/client_documentation/how_to_integrate_the_html5_client/catalog_of_notification_events
       *
       * @type String
       * @default undefined
       */
      this.loginUrl = undefined;
      /**
       * Toogles the visibility of deposit button/links.
       *
       * @type Bool
       * @default undefined
       */
      this.enableDeposit = undefined;
      /**
       * The URL location to redirect to when the user wants to deposit
       * money into his/her account. This URL can be an absolute URL or
       * a relative URL which is relative to the HTML file.
       *
       * A special case: Setting this.depositUrl = 'notification' will
       * prevent a redirect and instead the Kambi client sends a
       * notification event 'depositRequested'.
       * see https://www.kambipartner.com/techhub/api_docs/gen_doc/client_documentation/how_to_integrate_the_html5_client/catalog_of_notification_events
       *
       * @type String
       * @default undefined
       */
      this.depositUrl = undefined;
      /**
       * Toggles live betting. When set to false no live events or live
       * bet offers will be available in the client.
       *
       * @type Boolean
       * @default true
       */
      this.enableLiveBetting = true;
      /**
       * Toggles visibility of odds format selector in the client
       *
       * @type Boolean
       * @default false
       */
      this.enableOddsFormatSelector = false;
      /**
       * For tracking with Google Universal Analytics.
       * Google calls this the Web Property Id and
       * calls it UA-XXXX-Y in their documentation.
       *
       * @type String
       * @default ''
       */
      this.googleAnalyticsWebPropertyID = '';
      /**
       * Enables live betting by phone only mode.
       *
       * @type Boolean
       * @default false
       */
      this.liveBettingByPhoneOnlyEnabled = false;
      /**
       * Live betting by phone only:
       * The phone number to be called when a call button is activated.
       * ! Observe this is the actual number to be called !
       *
       * @type String
       * @default undefined
       */
      this.liveBettingPhoneNumber = undefined;
      /**
       * Live betting by phone only:
       * A freetext string which will replace the phone number to be called. Only for presentational use.
       *
       * Appended to a more generic message regarding Call to place bet. In dialogues etc.
       *
       * @type String
       * @default undefined
       */
      this.liveBettingHumanReadablePhoneNumber = undefined;
      /**
       * Live betting by phone only:
       * A freetext string witch will added to the more generic message regarding Call to place bet.
       *
       * It tells which regulation applies
       * E.g 'Australian regulations'
       *
       * @type String
       * @default undefined
       */
      this.liveBettingRegulationString = undefined;
      /**
       * Show all sports directly in the nav-panel:
       * Instead of only showing the ordered sports in the nav-panel and link to A-Z page we display all sports in nav-panel and hides the link to A-Z
       *
       *
       * @type Boolean
       * @default false
       */
      this.enableAllSportsInNavpanel = true; /*deprecated since April 13, 2016 - its now on for all*/
      /**
       * Toggles 'My Bonus Offers' / 'My Free Bets' (bonus-offers) navigation menu item.
       * If the bonus-offers menu link is added to client by Kambi, then it is possible to hide it by setting enableMyBonusOffers = false.
       *
       * @type Boolean
       * @default true
       */
      this.enableMyBonusOffers = true;
      /**
       * Show search component:
       *
       * @type Boolean
       * @default true
       */
      this.enableTermSearch = true;
      /**
       * Show filter component:
       *
       * @type Boolean
       * @default true
       */
      this.enableFilterMenu = true;
      /**
       * Show UpcomingLiveFilter in filter component:
       *
       * @type Boolean
       * @default true
       */
      this.enableUpcomingLiveFilter = true;
      /**
       * Show StreamingFilter in filter search component:
       *
       * @type Boolean
       * @default true
       */
      this.enableStreamingFilter = true;
      /**
       * Sets the betslip to being pinned (ie always visible) in the client. It is not possible for the user to unpin it.
       *
       * @type Boolean
       * @default false
       */
      this.enablePinnedBetslip = false;
      /**
       * Sets the betslip to being pinned (ie always visible) in the client upon starting it. It is possible for the user to unpin it. It will return to the pinned state if the client is reloaded.
       *
       * @type Boolean
       * @default false
       * NOTE: Available since version 1.517.0.0
       */
      this.enableBetslipInitialStatePinned = false;
      /**
       * Allocate space for header element at the top of the client
       * This will reduce the height of the betting client with the number passed in (pixels) so the betting client will have the height of the viewport
       * minus the passed in fixeHeaderHeight value
       *
       * @type Number
       * @default 0
       */
      this.fixedHeaderHeight = 0;
      /**
       * Hide header component in the client
       *
       * @type Boolean
       * @default false
       */
      this.hideHeader = false;

      /**
       * Tax percentage value can be provided as a number in this setting
       * That value will be used to calculate the tax on potential payout and show a text or link(having actual tax value) at the bottom of the betslip.
       * If the CustomerSettings has footerLinks having terms and conditions in it, the above tax text will be treated as link and will navigate to given terms and conditions link.
       * If no terms and conditions link is found in CustomerSettings footerLinks then tax will be treated as a simple text.
       *
       * Since some operators has there own tax related link/text shown at the bottom of betslip, so the operators needs to remove their link/text before using this setting
       *
       * @type Number
       * @default 0
       *
      */
      this.payoutTaxAmount = 0;

      /**
       * Show previously searched terms section in search component:
       *
       * @type Boolean
       * @default false
       */
      this.enablePreviouslySearchedTerms = true;  /*deprecated since April 13, 2016 - its now on for all*/
      /**
       * Route root can be used to set a route prefix in the routes
       * used by the Kambi client. This is usually only needed if the operator
       * also relies on # navigation or in combination with enablePushState
       * and the client is not rendered at the domain root
       *
       * @type String
       * @default undefined
       */
      this.routeRoot = undefined;

      /**
       * Show a toaster (message) to the punter when a bet is settled.
       *
       * @type Boolean
       * @default true
       */
      this.enableBetSettlementToaster = true;

      /**
       * Disables CashOut button in client if set to true.
       *
       * Old CashIn button is removed, but the flag name remained same.
       *
       * @type Boolean
       * @default false
       */
      this.disableCashIn = false;

      /**
      *   Available version: 1.532.0.0
      * possibility to build the client containing only the betslip.
      * the interaction with the betslip will be done through WAPI or populate from URL (see WAPI docs and populate betslip from link docs)
      *
      * in order to use "pinned" functionality, it's needed to set the pinned selector in "betslipQuerySelectors"
      */

      this.loadBetslipModule = true;

      /**
      *   Available version: 1.434.0.0
      * possibility to set up the containers for where the betslip should be if the default is not wished for.
      *
      * @type Object
      * pinned: element for betslip in pinned mode
      * unpinned: element for betslip in unpinned mode
      * NOTE: Overriding this setting overrides complete value so it would not merge object, it would replace it.
      */
      this.betslipQuerySelectors = {pinned: "", unpinned: ""}


      /**
       * Hides the entire client (including header, footer and navigation) on specified routes.
       * Example: ['home', 'filter/all/all/all/all/in-play']
       * will hide the client on start page and the live right now page (note the omitting of the hash #).
       * Note that the client will continue loading resources and updating the hidden page which can affect the browser performance.
       * The client can be made visible using WAPI (CLIENT_SHOW method).
       * RegExp string patterns can be used but without:
       * start char ^ and end char $
       *
       * @type Array of strings
       * @default []
       * NOTE: Overriding this setting overrides complete value so it would not merge array, it would replace it.
       */
      this.emptyClientRoutes = [];

      /**
       * Renders empty page in the client for specified routes
       * Example: ['^home', 'filter/all/all/all/all/in-play']
       * will render empty page instead of start page and the live right now page (note the omitting of the hash #).
       * Note that the client will not load resources and will not render the original page which is better for browser performance.
       * Therefore this setting should be preferred over "emptyClientRoutes" if the original client page is not to be used at all.
       * RegExp string patterns can be used.
       *
       * @type Array of strings
       * @default []
       * NOTE: Overriding this setting overrides complete value so it would not merge array, it would replace it.
       */
      this.reservedRoutes = [];

      /**
       * Defines routes ignored by the betting client.
       * Navigating to such routes will not cause any update in the client).
       * (available from v1.648.0.0)

       * Example: ['login$', 'menu$']
       * The client will ignore any route ending with "login" or "menu".
       * RegExp string patterns can be used.
       *
       * @type Array of strings
       * @default []
       * NOTE: Overriding this setting overrides complete value so it would not merge array, it would replace it.
       */
      this.ignoredRoutes = [];

      /**
      * External visualization (available from v1.353.0.0)
      *
      * Kambi need to enable a sport - so first talk to Kambi
      *
      * Supported sports
      * AMERICAN_FOOTBALL, VOLLEYBALL, BASKETBALL, RUGBY_UNION, DARTS, ICE_HOCKEY, HANDBALL, BEACH_VOLLEYBALL, BADMINTON
      *
      * enableVisualisation.timezone
      * The timezone the visualisation will use. See https://en.wikipedia.org/wiki/
      * List_of_tz_database_time_zones for all available timezones. Default is Europe/Berlin
      *
      * enableVisualisation.colors (optional)
      * Override one or more colors in the visualisation set by Kambi. It is fine by just overriding one color.
      * The color settings originate from betradar widget center.
      * Has to be specified as a rgb-value. Ex rgb(255, 255, 255)
      *
      * enableVisualisation.BASKETBALL.enable
      * To enable a sport set the enable field to true.
      * Available sports VOLLEYBALL, BASKETBALL, RUGBY_UNION, DARTS, ICE_HOCKEY, HANDBALL, BEACH_VOLLEYBALL, BADMINTON
      *
      * enableVisualisation.BASKETBALL.colors (optional)
      * Override one or more colors in the visualisation set by enableVisualisation.colors.
      * It is fine by just overriding one color. This override will apply for the specific sport.
      * NOTE: Overriding this setting overrides complete value so it would not merge object, it would replace it.
      */
      this.enableVisualisation = {
          timezone: 'Europe/Berlin',
          colors: {
              pageBackground: "rgb(, , )",
              branding: "rgb(, , )",
              primaryFont: "rgb(, , )",
              primaryBackground: "rgb(, , )",
              headerFont: "rgb(, , )",
              homeTeamBackground: "rgb(, , )",
              awayTeamBackground: "rgb(, , )",
              teamFont: "rgb(, , )",
              dialogBackground: "rgb(, , )",
              dialogFont: "rgb(, , )",
              highlightBackground: "rgb(, , )",
              hightlightFont: "rgb(, , )",
          },
          // BASKETBALL: {
          //     enable: true / false,
          //     colors: { ... }
          // },
          // DART: {enable: true/false, colors:{...}},
          // RUGBY_UNION: {enable: true/false, colors:{…}},
          // VOLLEYBALL: {enable: true/false, colors:{...}}
          // ... more sports here
      }

      /**
      * Special branding for Sportradar (available from v1.445.0.0)
      *
      * If you have received a URL from Betradar for LMT widget then you can add them in the following settings:
      * this.externalVisualisationURLV2 for special branding of LMT version 2
      * this.externalVisualisationURLV3 for special branding of LMT version 3
      *
      * Example:
      *
      * this.externalVisualisationURLV2: "https://cs.betradar.com/ls/widgets/?/<your client name>/{language}/{timezone}/widgetloader/widgets",
      * this.externalVisualisationURLV3: "https://widgets.sir.sportradar.com/<your client name>/widgetloader"
      * with the "<your client name>" part reflecting your client name that you got from Betradar
      */
      this.externalVisualisationURLV2 = "https://cs.betradar.com/ls/widgets/?/kambi/en_GB/est/widgetloader/widgets/kambi",
      this.externalVisualisationURLV3 = "https://widgets.sir.sportradar.com/sportradar/widgetloader",

      /**
      * Styling of Sportradar version 3 (available from v1.445.0.0)
      *
      * To rebrand the Sportradar LMT version 3 widget you will have to create a theme in your account on betradar and host the
      * resulting css on a static URL and add it to "externalVisualisationStylingURLV3"
      *
      * Example:
      *
      * this.externalVisualisationStylingURLV3: "https://my.cssStash.com/ourTheme.css""
      */
      this.externalVisualisationStylingURLV3 = ''

      /**
      * Sports that will be added to the A-Z sports view, the sortorder is alphabetic
      * NOTE: Overriding this setting overrides complete value so it would not merge object, it would replace it.
      */
      this.operatorAZSports = [
          {
              href: "http://www.link-to-operator-choice.com",
              name: "Name of sport"
          }
      ];

      /**
       * An object containing the different links that are available in the
       * account section in the client.
       *
       * Link information should be presented as an object where the name of
       * the object is the link 'type'. The 'type' is used within the app to
       * display the right icon next to the link, if applicable. The link
       * 'type' can be a pre-defined type that the client is aware of, or any
       * custom type defined by the operator.
       *
       * Each link is defined with the following properties:
       *      - url: The URL of the link
       *      - label: The label to display for the link
       *      - sortOrder: The sort order of the link. Should be a whole
       *          number. The lower the number, the higher up on the page
       *          the link should be. Sort order 1 is the first item
       *      - external: True if the link is opened in a new window or false
       *          in the same window [Optional]
       *      - skipAnimation: To skip the closing animation of the account
       *          menu when opening links
       *
       * @type Object
       * @default undefined
       * NOTE: Overriding this setting overrides complete value so it would not merge object, it would replace it.
       */
      this.accountLinks = {
          // NOTE: This is only example code. Operator should replace with their
          // own implementation
          support: {
              url: 'http://kambi.com/',
              label: 'Support',
              sortOrder: 1,
              external: true
          },
          deposit: {
              url: 'http://kambi.com/',
              label: 'Deposit',
              sortOrder: 2,
              external: true
          },
          faq: {
              url: 'http://kambi.com/',
              label: 'FAQ',
              sortOrder: 3,
              external: true
          }
      };
      /**
       * An object containing the different links that are available in the
       * footer in the client.
       *
       * Link information should be presented as an object where the name of
       * the object is the link 'type'. The 'type' is used within the app to
       * display the right icon next to the link, if applicable. The link
       * 'type' can be a pre-defined type that the client is aware of, or any
       * custom type defined by the operator.
       *
       * Each link is defined with the following properties:
       *      - url: The URL of the link
       *      - label: The label to display for the link
       *      - sortOrder: The sort order of the link. Should be a whole
       *          number. The lower the number, the higher up on the page
       *          the link should be. Sort order 1 is the first item
       *      - external: True if the link is opened in a new window or false
       *          in the same window [Optional]
       *      - featured: True if the link is to be highlighted on the start
       *          page below the normal content but above all other footer
       *          links. The link will be displayed as a full-width link with
       *          a pre-defined icon on the right. [Optional]
       *
       * If the link is an image link the following should be added:
       *      - imageHref: The url to the image that should be shown as a link
       *      - label: Note that the label will be used as the 'alt' property
       *          of the HTML img tag (shown if the image URL is wrong, image
       *          type is not supported and while the image is downloading).
       *
       * @type Object
       * @default undefined
       *
       * E.g.:
       * NOTE: Overriding this setting overrides complete value so it would not merge object, it would replace it.
       */
      this.footerLinks = {
          // NOTE: This is only example code. Operator should replace with their
          // own implementation
          liveRightNow: {
              url: '#events/live',
              label: 'Live Right Now',
              sortOrder: 1,
              external: false
          },
          tac: {
              url: 'http://kambi.com/',
              label: 'Terms and Conditions',
              sortOrder: 2,
              external: true
          },
          responsibleGaming: {
              url: 'http://kambi.com/',
              label: 'Responsible gaming',
              sortOrder: 3,
              external: true
          },
          account: {
              url: 'http://kambi.com/',
              label: 'My Account',
              sortOrder: 1,
              external: true,
              featured: true
          },
          bettingGuide: {
              url: 'http://kambi.com/',
              label: 'Betting guide',
              sortOrder: 2,
              external: true,
              featured: true
          },
          logo: {
              url: 'http://kambi.com/',
              label: 'Kambi',
              imageHref: 'http://kambi.com/wp/wp-content/themes/kambi/images/logo.png',
              sortOrder: 1,
              external: true
          }
      };
      /**
       * DEPRECATED - Use this.betslipLinks instead
       */
      this.betslipLink = {
      };
      /**
       * An object or array of objects containing the optional links to be displayed at the bottom
       * of the betslip.
       *
       * The link is defined with the following properties:
       *      - url: The URL of the link
       *      - label: The label to display for the link
       *      - external: True if the link is opened in a new window or false in
       *          the same window [Optional]
       *
       * @type Object
       * @default undefined
       * NOTE: Overriding this setting overrides complete value so it would not merge object, it would replace it.
       */
      this.betslipLinks = [
          {
              url: 'http://example.com/',
              label: 'Example link',
              external: true
          },
          {
              url: 'http://example.com/',
              label: 'Play It Safe',
              external: true
          }  
      ];
          // NOTE: This is only example code. Operator should replace with their
          // own implementation
      /**
       * An object containing the optional links to be displayed at the bottom
       * of the bet history, below the 'More' bets link.
       *
       * The link is defined with the following properties:
       *      - url: The URL of the link
       *      - label: The label to display for the link
       *      - external: True if the link is opened in a new window or false in
       *          the same window [Optional]
       *
       * @type Object
       * @default undefined
       * NOTE: Overriding this setting overrides complete value so it would not merge object, it would replace it.
       */
      this.bethistoryLinks = {
          // NOTE: This is only example code. Operator should replace with their
          // own implementation
          link: {
              url: 'http://kambi.com/',
              label: 'German regulations',
              external: true
          }
      };

      /**
       * An object containing the optional links to be displayed at the top
       * of the navigation panel. In development; links defined here may not appear in the client yet.
       *
       * The link is defined with the following properties:
       *      - url: The URL of the link
       *      - label: The label to display for the link
       *      - external: True if the link is opened in a new window or false in
       *          the same window [Optional]
       *
       * @type Object
       * @default undefined
       * NOTE: Overriding this setting overrides complete value so it would not merge object, it would replace it.
       */
      this.navigationTopLinks = {
          // NOTE: This is only example code. Operator should replace with their
          // own implementation
          link: {
              url: 'http://kambi.com/',
              label: 'Home page',
              external: true
          }
      };

      /**
       * An object containing the optional links to be displayed at the bottom
       * of the navigation panel. In development; links defined here may not appear in the client yet.
       *
       * The link is defined with the following properties:
       *      - url: The URL of the link
       *      - label: The label to display for the link
       *      - external: True if the link is opened in a new window or false in
       *          the same window [Optional]
       *
       * @type Object
       * @default undefined
       * NOTE: Overriding this setting overrides complete value so it would not merge object, it would replace it.
       */
      this.navigationBottomLinks = {
          // NOTE: This is only example code. Operator should replace with their
          // own implementation
          link: {
              url: 'http://kambi.com/',
              label: 'About us',
              external: true
          }
      };

      /**
       * An object containing the optional links to be displayed at the bottom of the popular section
       * of the navigation panel. In development; links defined here may not appear in the client yet.
       *
       * The link is defined with the following properties:
       *      - url: The URL of the link
       *      - label: The label to display for the link
       *      - title: The title to show when hoover with the pointer
       *      - external: True if the link is opened in a new window or false in
       *          the same window [Optional]
       *
       * The key for the link (e.g. top-european-football) must be unique and is used for tracking navigation through this link.
       * The value of the key may be anything accepted by JavaScript. Any number of links may be added with unique keys.
       *
       * @type Object
       * @default undefined
       * NOTE: Overriding this setting overrides complete value so it would not merge object, it would replace it.
       */
      this.popularLinks = {
          'top-european-football': {
              url: '#filter/football/[england,euro_2016,champions_league]/[[premier_league]]',
              label: 'Top European Football',
              title: 'Top European Football',
              external: false
          }
      };

      /**
       * Toggles visibility of the navigation menu in the client (if browser-window is wide enough)
       *
       * @type Boolean
       * @default false
       */
      this.enableNavigationPanel = false;


      /**
      *   States that we want to get notified when the client gets this error trying to place bets and not being logged in
      *   (see documentation about notifications for more info)
      * NOTE: Overriding this setting overrides complete value so it would not merge array, it would replace it.
      */
      this.customizedBetslipFeedbackTypes = ["VET_NOT_LOGGED_IN"]

      /**
      *   Toggles visibility of the prematch stats widgets (gm-team-performance and gm-head-to-head widgets) on the event page
      *
      *   @type Object or Boolean
      * NOTE: Overriding this setting overrides complete value so it would not merge object, it would replace it.
      */
      // Enable / disable prematch stats per sport
      this.enablePrematchStats = {
          FOOTBALL: true,
          TENNIS: true,
          BASKETBALL: true,
          VOLLEYBALL: true,
          ICE_HOCKEY: true
      };
      // Enable prematch stats for all sports
      // this.enablePrematchStats = true;

      // Disable prematch stats for all sports
      // this.enablePrematchStats = false;

      /**
      *   UP-COMING: Release TBA (Edit: 11/4 2018)
      *   Override where betslip should mount for pinned and unpinned states
      *   Use document.querySelector to find container from specified selector
      *
      *   @type Object
      * NOTE: Overriding this setting overrides complete value so it would not merge object, it would replace it.
      */
      this.betslipQuerySelectors = {pinned: "#KambiBC-contentWrapper__bottom", unpinned: "body"}; //default values

       /**
       * Enables Teaser+ for specified leagues.
       *
       * The value supplied should be the termKey for the league.
       * Note: only available for NFL for now
       *
       * @type Array of strings
       * @default []
       * NOTE: Overriding this setting overrides complete value so it would not merge array, it would replace it.
       */
      this.betslipTeaserLeagueIds = ["nfl"];

       /**
       * Enables Teaser+ for specified betoffer criterion ids
       *
       * Teaser+ is enabled for Total Points - Including Overtime and Handicap - Including Overtime by default.
       * The default criterion ids will only work in production.
       * To test Teaser+ in CTN the following criterion ids needs to be supplied: [1003110754, 1003110752].
       *
       * @type Array of numbers
       * @default [1001159928, 1001159490]
       * NOTE: Overriding this setting overrides complete value so it would not merge array, it would replace it.
       */
      this.betslipTeaserCriterionIds = [1001159928, 1001159490];

      /**
      *  Overrides the default stream poster image
      *  Keyed by Kambi sport name (uppercase).
      *  The sport can have one image for all screen resolutions, or one for each device pixel ratio.
      *  If the device pixel ratio is higher than the highest ratio provided then the image with the closest provided ratio will be used.
      *  Only integer ratios are supported. If the device pixel ratio is not an integer then it is rounded up to the next integer.
      *  @type Object
      * NOTE: Overriding this setting overrides complete value so it would not merge object, it would replace it.
      */
      this.posterPhotos = {
          FOOTBALL: 'https://www.example.com/vector-image.svg',
          BASKETBALL: {
              '1x': 'https://www.example.com/raster-1x.png',
              '2x': 'https://www.example.com/raster-2x.png'
          }
      };

      /**
      *  Enables sport filter icons at the top of event list views.
      *  Released in 1.481.0.0 on 5 November 2018
      *  @type Boolean
      *  @default true
      */
      this.enableMultiSportsEventsFilter = true;

      /**
      *  If true, the left navigation panel will behave like on mobile (hidden by default), and the hamburger menu will
      *  always be visible. If the screen resolution allows it (min. 768px), a 'Menu' label will be displayed next to
      *  the menu icon.
      *  Released in betting client v.1.492.0.0
      *  @type Boolean
      *  @default true
      */
      this.alwaysShowMenu = true;

      /**
      * Origins of windows of third-party iframes that are allowed to communicate
      * with the Kambi client using WAPI.
      * Origin string is the concatenation of the protocol and "://", the host name if one exists,
      * and ":" followed by a port number if a port is present and differs from the default port
      * for the given protocol.
      * Examples of typical origins are https://example.org (implying port 443),
      * http://example.net (implying port 80), and http://example.com:8080
      *
      * @type string[]
      */
      this.wapiWhitelistedIframeOrigins = [];
       
      /**
      * Enable Lucky 15 (after yankee), 31 (after canadian) and 63 (after heinz)
      * in the system bet tab in the betslip
      * @type Boolean
      * @default false
      */
      this.enableLuckyBets = true;
       
      /**
      * Enables the Kambi Client to use HTML5 History API (pushState) instead of document.location.hash
      * for changing the URL without page reload.
      *
      * The internal links in the Client have form of https://[pageurl]/filter/football
      * instead of https://[pageurl]/#filter/football
      * @type Boolean
      * @default false
      */
      this.enablePushState = false;

      /**
      * Changes the default sorting on event lists. Valid values are "sortByLeague", "sortByTime" or undefined.
      * @type string
      * @default "sortByLeague"
      */
      this.defaultSortForEventGroups = "sortByTime";

      /**
      * Overrides defaultSortForEventGroups to "sortByLeague" for the sports in the array.
      * @type Array of strings
      * @default []
      * NOTE: Overriding this setting overrides complete value so it would not merge array, it would replace it.
      */
      this.sortEventListsByLeagueOnSports = [
          "FOOTBALL",
          "ICE_HOCKEY"
      ];

      /**
      * Overrides defaultSortForEventGroups to "sortByTime" for the sports in the array.
      * @type Array of strings
      * @default ["ATHLETICS", "CYCLING", "WINTER_OLYMPIC_GAMES", "WINTER_SPORTS"]
      * NOTE: Overriding this setting overrides complete value so it would not merge array, it would replace it.
      */
      this.sortEventListsByTimeOnSports = [
          "TENNIS"
      ];

      /**
      * This settings will make the betslip collapse when adding a second outcome in a desktop browser.
      * @type Boolean
      * @default false
      * NOTE: Available from version 1.531.0.0
      */
      this.collapseBetslipOnSecondOutcomeForDesktop;

      /**
      * This settings will make the betslip collapse when adding a second outcome in a mobile browser.
      * @type Boolean
      * @default true
      * NOTE: Available from version 1.531.0.0
      */
      this.collapseBetslipOnSecondOutcomeForMobile;

      /**
       * This settings sets animations on adding/removing outcomes to collapsed betslip.
       * @type Object
       * @default { addingOutcome: 'blink', removingOutcome: 'bounce' }
       * Currently possible values are 'blink', 'bounce', and undefined.
       * NOTE: Overriding this setting overrides complete value so it would not merge object, it would replace it.
       * NOTE: Available from version 1.533.0.0
       */
      this.collapsedBetslipAnimations = {
          addingOutcome: 'bounce',
          removingOutcome: 'blink'
      };

      /**
      * This settings will make the betslip be in a compressed layout.
      * @type Boolean
      * @default true
      * NOTE: Available from version 1.531.0.0
      */
      this.useCompressedBetslip;


      /**
      * This settings will hide the tabs in betslip when there is only one bet(outcome) added to it.
      * @type Boolean
      * @default true
      * NOTE: Available from version 1.531.0.0
      */
      this.hideBetslipTabsForOneSelectedBet;


      /**
      * This settings will show the balance and login/logout in header (to the right of the search bar).
      * @type Boolean
      * @default false
      * NOTE: Available from version 1.529.0.0
      */
      this.showBalanceLoginInHeader;

      /**
      * Sets higher priority for ClientApi component loading during the start-up of the client.
      * It makes WAPI ready to communicate with the client earlier.
      * Note that enabling this setting increases the time of initial loading and rendering of the client.
      * @type Boolean
      * @default false
      * NOTE: Available from version 1.605.0.0
      */
      this.prioritiseClientApiLoading;
  };
  /**
   * Returns the current balance of the logged in user. This function returns
   * data asynchronously by the use of callback functions.
   *
   * The success function should be called when the operator's request for the
   * balance is successful. The success function should be supplied with
   * the balance (Number) as a parameter.
   *
   * The failure function should be called when the operator's request for the
   * balance has failed.
   * NOTE: From release 1.668.0 the client will not pass $ reference to jQuery library in function arguments
   * @param {Function} successFunc Success callback function
   * @param {Function} failureFunc Failure callback function
   */
CustomerSettings.prototype.getBalance = function (successFunc, failureFunc) {
// NOTE: This is only example code. Operator should replace with their
// own implementation
fetch('data/Balance.json?cb=' + Math.random())
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to fetch balance');
    }
  })
  .then((json) => {
    // The response sent to the success function should be the                // actual balance value
    successFunc(parseFloat(json));
  })
  .catch((e) => {
    failureFunc(e);
  });
};
  /**
   * Inform the operator that the current user should be logged out.
   *
   * It is the responsibility of the operator to make sure that the user is
   * logged out and that the HTML page is reloaded afterwards.
   *
   * NOTE: From release 1.668.0 the client will not pass $ reference to jQuery library in function arguments
   */
  CustomerSettings.prototype.logout = function () {
  };
  /**
   * Inform the operator to keep the logged in users session alive.
   * Called with an interval of 120 seconds as long as user interacts with the client.
   *
   * NOTE: From release 1.668.0 the client will not pass $ reference to jQuery library in function arguments
   */
  CustomerSettings.prototype.heartbeat = function () {
  };

  /**
   * Register a callback that is called once with its own callback to be called to keep the client session alive.
   * It will register a custom interaction and in the end of the heartbeat trigger the heartbeat as like any other interaction
   *
   * @param {Function} cb Callback to trigger when interaction happens
   *
   * Example:
   * CustomerSettings.prototype.registerKeepAliveCallback(function (userInteractedWithOperator) {
   *  operatorContainerElement.addEventListerner('click', userInteractedWithOperator, false)
   * });
   */
  // CustomerSettings.prototype.registerKeepAliveCallback(function (callback) {
  // });

  /**
   * Informs the operator with app specific events.
   * See https://www.kambipartner.com/techhub/api_docs/gen_doc/client_documentation/how_to_integrate_the_html5_client/catalog_of_notification_events for catalog of notification events
   * NOTE: From release 1.668.0 the client will not pass $ reference to jQuery library in function arguments
   * @param {Object} event
   */
  CustomerSettings.prototype.notification = function (event) {
      /**
      * event object has the following property {name: 'eventName'}
      */
  };

  /**
   * Inform the operator that the user clicked on event statistics link icon in event page or league view.
   * The operator can use this information to show the punter more statistics about the event.
   * If this setting is defined then a statistics icon will be rendered in the client.
   * NOTE: From release 1.668.0 the client will not pass $ reference to jQuery library in function arguments
   *
   * @param {String} eventId Event id (kambi event id)
   */
  CustomerSettings.prototype.showEventStatistics = function (eventId) {
  };

  /**
   * Version available: 1.434.0.0 (Edit: 11/4 2018)
   * If the operator wants to act when the client navigates to event that does not exist or faulty filterparameters.
   *
   * @param {String} url where the client tried to navigate
   *
   * If the operator wants the default behaviour of the client in this case (that it navigates to the start-page)
   * the function should return true, otherwise return false
   *
   */
  CustomerSettings.prototype.handle404 = function (url) {
  };

  /**
   * Version available: TBC
   * Used to enable the operator to take control over fullscreen video playback.
   * To indicate that the operator would like to take control, they should return true from onStreamFullscreen.
   * To indicate that Kambi should take control, they should return false.
   *
   * @param {Object} data
   * @param {number} data.eventId - The Kambi event ID associated with the stream
   * @param {String} data.streamFormat - The format of the stream. Currently only HLS is supported.
   * @param {String} [data.streamUrl] - The URL of the stream. This is optional because onStreamFullscreen is called first
   *     without the stream URL because the URLs may expire, and so a new URL must be fetched if the operator does
   *     want to take over fullscreen.
   * @param {function()} [data.fetchStreamUrl] - Callback which, when called, causes the Kambi client to fetch a new stream
* URL, which is then provided by calling onStreamFullscreen again with the new URL. Useful if the provided
   *     streamUrl expires. Provided only when streamUrl is provided
   * @param {function()} [data.onExitFullscreen] - Callback which, when called, notifies the Kambi client that fullscreen
   *     was exited. Provided only when streamUrl is provided
   *
   * @returns {boolean} Whether the operator will take control over fullscreen video playback. 
   *
   */
  CustomerSettings.prototype.onStreamFullscreen = function ({ eventId, streamFormat, streamUrl, fetchStreamUrl, onExitFullscreen }) {
      return false;
  };
   
  // Set the operator callbacks to the global space
  global.customerSettings = new CustomerSettings();
}(window))