<h1>jquery.presence.js </h1>

<h2> a simple jQuery plugin used to track user activity on a element inside a page</h2>


<p>It can be used to track user activity inside a DOM element, also on EMBED elements ( read flash games ) </p>



<h1>how to use</h1>

<h4>
 first off, attach the plugin to the desidered element:
</h4>
<pre>
	var presence = $('body').find('embed').presence();
</pre>

<h4>
	then we can call public methods and properties like this:
</h4>
<pre>
	presence.data('presence').getLog();
</pre>
