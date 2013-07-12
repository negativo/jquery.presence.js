<h1>jquery.presence.js </h1>

<h3> a simple jQuery plugin used to track user activity on a element inside a page</h3>


<p>It can be used to track user activity inside a DOM element, also on EMBED elements ( read flash games ) </p>



<h1>how to use</h1>

<h5>
	first off, attach the plugin to the desidered element:
</h5>
<pre>
	var presence = $('body').find('embed').presence();
</pre>

<h5>
	then we can call public methods and properties like this:
</h5>
<pre>
	presence.data('presence').getLog();
</pre>
