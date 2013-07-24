(function($) {
  $.presence = function(element, options, callback) {
    var defaults = {
      time: 10,
      autostart: true,
      stats: false,
      shootEvery: 0,
      callback: null
    };
    var plugin = this;
    plugin.settings = {};
    var $element = $(element),
      element = element;
    var userPlaying = true,
      inPause = 0,
      theLoop = "",
      isStopped = true,
      session = 0,
      totalSession =0,
      lastPause = 0,
      lastSession = 0,
      sessionLog = "";
    plugin.lastClick = 0;
    plugin.init = function() {
      plugin.settings = $.extend({}, defaults, options);
      if (plugin.settings.autostart === true) {
        isStopped = false;
        starter();
      }
    };
    function presencelog(string){
       //console.log('logging ... '+string);
       sessionLog += "\n " + string;
    }
    function activity() {
      userPlaying = true;
      plugin.lastClick = session;
      presencelog('active on ' + element );
    }
    function activityLeave() {
      presencelog('leave element: ' + element );
      reset();
    }
    function starter() {
      isStopped = false;
      loop();
      $(element).bind('mousedown', activity);
      $(element).bind('keydown', activity);
      $(element).bind('blur', activityLeave);
    }
    function stopper() {
      isStopped = true;
      $(element).unbind('mousedown', activity);
      $(element).unbind('keydown', activity);
      $(element).unbind('blur', activityLeave);
    }
    var loop = function() {
      theLoop = setTimeout(function() {
        if(plugin.settings.stats){
          $('body').find('.prensenceStats').find('.pause').html('pause: ' + inPause);
          $('body').find('.prensenceStats').find('.session').html('session: ' + session);
          $('body').find('.prensenceStats').find('.lastSession').html('lastSession: ' + lastSession);
          $('body').find('.prensenceStats').find('.totalSession').html('totalSession: ' + totalSession);
          $('body').find('.prensenceStats').find('.userPlaying').html('userPlaying: ' + userPlaying);
        }
        if (userPlaying) {
          session += 1;
          totalSession +=1;
          lastPause = (inPause === 0 ) ? lastPause : inPause;
          inPause = 0;
        } else {
          inPause += 1;
          lastSession = (session === 0 ) ? lastSession : session;
          presencelog('last session: '+lastSession);
          session = 0;
        }
        if (((inPause % plugin.settings.time === 0) && session === 0) || (parseInt(session, 10) > (parseInt(plugin.lastClick, 10) + parseInt(plugin.settings.time, 10)))) {
          userPlaying = false;
          presencelog('pause after session of: ' + lastSession );
        }
        loop();
      }, 1000);
    };
    var reset = function() {
      session = 0;
    };
    plugin.init();
    plugin.start = function() {
      starter();
    };
    plugin.stop = function() {
      stopper();
    };
    plugin.getUserPresence = function() {
      return userPlaying;
    };
    plugin.getPauseSessionTime = function() {
      return lastPause;
    };

    /*
     * last paused session
     */
    plugin.getLastMicroSessionTime = function() {
      return lastSession;
    };

    /*
     * actual microSession duration
     */
    plugin.getMicroSessionTime = function() { 
      return session;
    };
    plugin.getSessionTime = function() {
      return totalSession;
    };
    plugin.getLog = function() {
      return sessionLog;
    };
  };
  $.fn.presence = function(options, callback) {
    var dummy = null;
    if(typeof options !== 'object' && typeof options === 'function'){
      dummy = options;
      options = callback;
      callback = dummy;
    }
    callback();
    return this.each(function() {
      if (undefined === $(this).data('presence')) {
        var plugin = new $.presence(this, options, callback);
        $(this).data('presence', plugin);
      }
    });
  };
})(jQuery);