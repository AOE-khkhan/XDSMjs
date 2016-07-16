function Labelizer() {}

Labelizer.strParse = function(str) {
  var lstr = str.split(',');
  var rg = /([A-Za-z0-9]+)(_[A-Za-z0-9]+)?(\^.+)?/;

  var res = lstr.map(function(s) {
    var base;
    var sub;
    var sup;
    var m = s.match(rg);
    if (m) {
      base = m[1];
      if (m[2]) {
        sub = m[2].substring(1);
      }
      if (m[3]) {
        sup = m[3].substring(1);
      }
    } else {
      console.log("Warning : can not parse " + s);
    }
    return {base: base, sub: sub, sup: sup};
  }, this);

  return res;
};

Labelizer.labelize = function() {
  function createLabel(selection) {
    selection.each(function(d) {
      var tokens = Labelizer.strParse(d.name);
      var text = selection.append("text");
      tokens.forEach(function(token, i, ary) {
        text.append("tspan").text(token.base);
        var offsetSub = 0;
        var offsetSup = 0;
        if (token.sub) {
          offsetSub = 10;
          text.append("tspan")
            .attr("class", "sub")
            .attr("dy", offsetSub)
            .text(token.sub);
        }
        if (token.sup) {
          offsetSup = -10;
          text.append("tspan")
            .attr("class", "sup")
            .attr("dx", -5)
            .attr("dy", -offsetSub + offsetSup)
            .text(token.sup);
          offsetSub = 0;
        }
        if (i < ary.length - 1) {
          text.append("tspan")
            .attr("dy", -offsetSub - offsetSup)
            .text(", ");
        }
      }, this);
    });
  }

  return createLabel;
};

module.exports = Labelizer;
