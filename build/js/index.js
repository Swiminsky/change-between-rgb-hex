var dom = Regular.dom;
Regular.event('enter',function(elem,fire){
	function update(ev) {
		if (ev.which == 13) {
			ev.preventDefault();
			fire(ev);
		}
	}
	dom.on(elem,"keypress",update);
	return function destory(){
		dom.off(elem,"keypress",update);
	};
});
var cgModel = Regular.extend({
	template: 
		"<div class='u-topbar' ref=topbar></div>"+
		"<input r-model={color.o} placeholder='Input Here' autofocus='autofocus' on-enter={this.show(color.o)}/>" +
		"<div class='btn' on-click={this.show(color.o)}>DO CHANGE</div>" +
		"<div class='u-ex'>Let's try : "+
		"{#list show.ex as ex}" +
			"<span class='u-ex-item' on-click={this.show(ex)}>{ex}</span>"+
		"{/list}"+
		"</div>"+
		"{#if show.status}"+
		"<div class='u-res' style='background:{color.n}'>{color.n}</div>"+
		"{#else}"+
		"<div class='u-err' on-click='test'>{show.err}</div>"+
		"{/if}"+
		"<div class='u-history'>"+
			"<div class='u-tip' r-hide='{!show.history.length}'>{show.historyTip}</div>"+
			"{#list show.history as item}"+
			"<div class='u-his-item' style='background:{item}'>{item}</div>"+
			"{/list}"+
		"</div>"+
		"<div class='u-plt'>"+
			"<div class='u-tip'>{show.tip}</div>"+
			"{#list palette as item}"+
				"<div class='u-plt-i' style={item.name==\"CLOUDS\"?'color:#aaa;background:'+item.color:'background:'+item.color} on-click={this.show(item.color)}>"+
				"<div>{item.color}</div>"+
				"<div>{item.name}</div>"+
				"</div>"+
			"{/list}"+
		"</div>",
	init: function(){
	},
	test: function(ev){
	},
	show: function(v) {
		var r = '',
			err = '',
			_k = /#/.test(v),
			_u = v.split(","),
			_h = this.data.show.history;
		//hex2rgb
		if (_k && v.length == 4) {
			this.data.show.status = true;
			for (var i = 1; i < 4; i++) {
				var re = new RegExp(/^[0-9a-f]$/i);
				if (re.test(v.charAt(i))) {
					r += parseInt(v.charAt(i).concat(v.charAt(i)), 16) + ",";
				}
				else {
					this.data.show.status = false;
					this.data.show.err = "TYPE ERROR!";
					break;
				}
			}
			if (this.data.show.status === true) {
				r = "rgb("+r.slice(0, -1)+")";
				_h.unshift(v);
			}
		}
		//hex2rgb
		else if (_k && v.length == 7) {
			this.data.show.status = true;
			for (var i = 1; i < 7; i += 2) {
				var re = new RegExp(/^[0-9a-f]{2}$/i);
				if (re.test(v.substr(i, 2))) {
					r += parseInt(v.substr(i, 2), 16) + ",";
				}
				else {
					this.data.show.status = false;
					this.data.show.err = "TYPE ERROR!";
					break;
				}
			}
			if (this.data.show.status === true) {
				r = "rgb("+r.slice(0, -1)+")";
				_h.unshift(v);
			}
		}
		//rgb2hex 
		else if (!_k && _u.length == 3) {
			this.data.show.status = true;
			for (var i = 0; i < 3; i++) {
				if (_u[i]>=0&&_u[i]<=255) {
					var n = new Number(_u[i]);
					r += n >= 0 && n < 16 ? "0" + n.toString(16) : n.toString(16);
				}
				else {
					this.data.show.status = false;
					this.data.show.err = "TYPE ERROR!";
					break;
				}
			}
			if (this.data.show.status === true) {
				r = "#" + r;
				_h.unshift("rgb("+v+")");
			}
		}
		//input error
		else {
			this.data.show.status = false;
			this.data.show.err = "TYPE ERROR!";
		}
		if (_h.length > 8) {
			this.data.show.history = _h.slice(0,8);
		}
		this.data.color.o = '';
		this.data.color.n = r;
	}
});
var cg = new cgModel({
	data: {
		show: {
			ex: [
				"#aaa",
				"#10ab86",
				"66,139,202"
			],
			status: 0,
			err: "",
			tip: "Here is a great standard flat ui color palette for you !",
			historyTip: 'HISTORY',
			history: []
		},
		color: {
			o: "",
			n: ""
		},
		palette: [
			{
				color: '#1ABC9C',
				name: 'TURQUOISE'
			},
			{
				color: '#16A085',
				name: 'GREEN SEA'
			},
			{
				color: '#2ECC71',
				name: 'EMERALD'
			},
			{
				color: '#27AE60',
				name: 'NEPHRITIS'
			},
			{
				color: '#3498DB',
				name: 'PETER RIVER'
			},
			{
				color: '#2980B9',
				name: 'BELIZE HOLE'
			},
			{
				color: '#9B59B6',
				name: 'AMETHYST'
			},
			{
				color: '#8E44AD',
				name: 'WISTERIA'
			},
			{
				color: '#34495E',
				name: 'WET ASPHALT'
			},
			{
				color: '#2C3E50',
				name: 'MIDNIGHT BLUE'
			},
			{
				color: '#F1C40F',
				name: 'SUN FLOWER'
			},
			{
				color: '#F39C12',
				name: 'ORANGE'
			},
			{
				color: '#E67E22',
				name: 'CARROT'
			},
			{
				color: '#D35400',
				name: 'PUMPKIN'
			},
			{
				color: '#E74C3C',
				name: 'ALIZARIN'
			},
			{
				color: '#C0392B',
				name: 'POMEGRANATE'
			},
			{
				color: '#ECF0F1',
				name: 'CLOUDS'
			},
			{
				color: '#BDC3C7',
				name: 'SILVER'
			},
			{
				color: '#95A5A6',
				name: 'CONCRETE'
			},
			{
				color: '#7F8C8D',
				name: 'ASBESTOS'
			}
		]
	}
});
cg.$inject("#app");