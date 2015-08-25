var cgModel = Regular.extend({
	template: "<input r-model={color.o} placeholder='Input Here' autofocus='autofocus'/>" +
		"<div class='btn' on-click={this.show(color.o)}>DO CHANGE</div>" +
		"<div class='u-res'>{color.n}</div>"+
		"<div class='u-plt'><div class='u-tip'>{show.tip}</div>"+
		"{#list palette as item}"+
		"<div class='u-plt-i' style={item.name==\"CLOUDS\"?'color:#aaa;background:'+item.color:'background:'+item.color}>"+
		"<div>{item.color}</div>"+
		"<div>{item.name}</div>"+
		"</div>{/list}</div>",
	show: function(v) {
		var r = '',
			_k = /#/.test(v),
			_u = v.split(",");
		//hex2rgb
		if (_k && v.length == 4) {
			for (var i = 1; i < 4; i++) {
				r += parseInt(v.charAt(i).concat(v.charAt(i)), 16) + ",";
			}
			r = r.slice(0, -1);
		}
		//hex2rgb
		else if (_k && v.length == 7) {
			for (var i = 1; i < 7; i += 2) {
				r += parseInt(v.substr(i, 2), 16) + ",";
			}
			r = r.slice(0, -1);
		}
		//rgb2hex
		else if (!_k && _u.length == 3) {
			for (var i = 0; i < 3; i++) {
				var n = new Number(_u[i]);
				r += n >= 0 && n < 16 ? "0" + n.toString(16) : n.toString(16);
			}
			r = "#" + r;
		}
		//input error
		else {
			r = "格式错误，请重新输入";
		}
		this.data.color.o = '';
		this.data.color.n = r;
	}
})

var cg = new cgModel({
	data: {
		show: {
			ex: "",
			tip: "Here is a great standard flat ui color palette for you !"
		},
		color: {
			o: "",
			n: ""
		},
		palette: [
			{
				color: '#1ABC9C',
				name: 'TURQUOISE',
			},
			{
				color: '#16A085',
				name: 'GREEN SEA',
			},
			{
				color: '#2ECC71',
				name: 'EMERALD',
			},
			{
				color: '#27AE60',
				name: 'NEPHRITIS',
			},
			{
				color: '#3498DB',
				name: 'PETER RIVER',
			},
			{
				color: '#2980B9',
				name: 'BELIZE HOLE',
			},
			{
				color: '#9B59B6',
				name: 'AMETHYST',
			},
			{
				color: '#8E44AD',
				name: 'WISTERIA',
			},
			{
				color: '#34495E',
				name: 'WET ASPHALT',
			},
			{
				color: '#2C3E50',
				name: 'MIDNIGHT BLUE',
			},
			{
				color: '#F1C40F',
				name: 'SUN FLOWER',
			},
			{
				color: '#F39C12',
				name: 'ORANGE',
			},
			{
				color: '#E67E22',
				name: 'CARROT',
			},
			{
				color: '#D35400',
				name: 'PUMPKIN',
			},
			{
				color: '#E74C3C',
				name: 'ALIZARIN',
			},
			{
				color: '#C0392B',
				name: 'POMEGRANATE',
			},
			{
				color: '#ECF0F1',
				name: 'CLOUDS',
			},
			{
				color: '#BDC3C7',
				name: 'SILVER',
			},
			{
				color: '#95A5A6',
				name: 'CONCRETE',
			},
			{
				color: '#7F8C8D',
				name: 'ASBESTOS',
			},
		]
	}
})

cg.$inject("#app");