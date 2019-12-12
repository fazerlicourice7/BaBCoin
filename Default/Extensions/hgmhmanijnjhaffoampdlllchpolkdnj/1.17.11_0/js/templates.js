this["JST"] = this["JST"] || {};

this["JST"]["src/browser_action/templates/departments.hbs"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.ifGreaterThanZero || (depth0 && depth0.ifGreaterThanZero) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0["1"] : depth0),{"name":"ifGreaterThanZero","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=container.lambda, alias2=container.escapeExpression, buffer = 
  "    <div class=\"department-filter btn-white btn-sm\" data-department=\""
    + alias2(alias1((depth0 != null ? depth0["0"] : depth0), depth0))
    + "\">\n      ";
  stack1 = ((helper = (helper = helpers.departmentName || (depth0 != null ? depth0.departmentName : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"departmentName","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!helpers.departmentName) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + ": "
    + alias2(alias1((depth0 != null ? depth0["1"] : depth0), depth0))
    + "\n    </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(container.lambda((depth0 != null ? depth0["0"] : depth0), depth0));
},"5":function(container,depth0,helpers,partials,data) {
    return "  <div class=\"more-departments-button btn-white btn-sm\">●●●</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.departments : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifGreaterThanZero || (depth0 && depth0.ifGreaterThanZero) || helpers.helperMissing).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.departments : depth0)) != null ? stack1["3"] : stack1)) != null ? stack1["1"] : stack1),{"name":"ifGreaterThanZero","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["JST"]["src/browser_action/templates/email_finder.hbs"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"verified-icon fas fa-shield-check\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Verified\"></div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"score "
    + alias4(((helper = (helper = helpers.confidence_score_class || (depth0 != null ? depth0.confidence_score_class : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"confidence_score_class","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Confidence score: "
    + alias4(((helper = (helper = helpers.score || (depth0 != null ? depth0.score : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"score","hash":{},"data":data}) : helper)))
    + "%\"></div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"email","hash":{},"data":data}) : helper)));
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, buffer = 
  "  <div class=\""
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.still_on_page : depth0),{"name":"unless","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n    <a href=\""
    + alias3(alias2((depth0 != null ? depth0.uri : depth0), depth0))
    + "#hunter-email:"
    + alias3(alias2((depths[1] != null ? depths[1].value : depths[1]), depth0))
    + "\" target=\"_blank\" rel=\"nofollow\">\n      "
    + alias3(alias2((depth0 != null ? depth0.uri : depth0), depth0))
    + "\n    </a>\n    <span class=\"source-date\">\n      ";
  stack1 = ((helper = (helper = helpers.userDate || (depth0 != null ? depth0.userDate : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"userDate","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(alias1,options) : helper));
  if (!helpers.userDate) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n    </span>\n"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.still_on_page : depth0),{"name":"unless","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <br />\n  </div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "not-on-page";
},"10":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(container.lambda((depth0 != null ? depth0.extracted_on : depth0), depth0));
},"12":function(container,depth0,helpers,partials,data) {
    return "    <span class=\"not-on-page-label\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The email address is no longer on the page\">Removed</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, buffer = 
  "<div class=\"email-finder-result-email\">\n  <div class=\"email-container\">\n    <div class=\"email-copied\"></div>\n    <div class=\"email\">"
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "</div>\n"
    + ((stack1 = (helpers.ifIsVerified || (depth0 && depth0.ifIsVerified) || alias2).call(alias1,(depth0 != null ? depth0.score : depth0),{"name":"ifIsVerified","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(3, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "    <span class=\"copy-status\">Copy</span>\n  </div>\n  <button class=\"save_lead_button action_lead_button pull-right\" data-email=\""
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "\">\n    <i class=\"fas fa-plus\"></i>\n    <span class=\"lead_status\">Save</span>\n  </button>\n</div>\n<div class=\"email-finder-result-profile\">\n  <div class=\"email-finder-result-pic\">\n    <img src=\"https://www.gravatar.com/avatar/";
  stack1 = ((helper = (helper = helpers.md5 || (depth0 != null ? depth0.md5 : depth0)) != null ? helper : alias2),(options={"name":"md5","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.md5) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "?s=128&d=https%3A%2F%2Flogo.clearbit.com%2F"
    + alias4(((helper = (helper = helpers.domain || (depth0 != null ? depth0.domain : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"domain","hash":{},"data":data}) : helper)))
    + "\" />\n  </div>\n  <h3>"
    + alias4(((helper = (helper = helpers.first_name || (depth0 != null ? depth0.first_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"first_name","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.last_name || (depth0 != null ? depth0.last_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"last_name","hash":{},"data":data}) : helper)))
    + "</h3>\n  <div class=\"email-finder-result-title\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\n</div>\n<div class=\"email-finder-result-method\">"
    + ((stack1 = ((helper = (helper = helpers.method || (depth0 != null ? depth0.method : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"method","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n<div class=\"email-finder-result-sources sources-list\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.sources : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true,"useDepths":true});

this["JST"]["src/browser_action/templates/search_results.hbs"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "complete-profile";
},"3":function(container,depth0,helpers,partials,data) {
    return "          <div class=\"verified-icon fas fa-shield-check\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Verified\"></div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "          <div class=\"score "
    + alias4(((helper = (helper = helpers.confidence_score_class || (depth0 != null ? depth0.confidence_score_class : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"confidence_score_class","hash":{},"data":data}) : helper)))
    + "\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Confidence score: "
    + alias4(((helper = (helper = helpers.confidence || (depth0 != null ? depth0.confidence : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"confidence","hash":{},"data":data}) : helper)))
    + "%\"></div>\n          <div class=\"verification-link\" data-email=\""
    + alias4(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "\">\n            <i class=\"fas fa-check\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Verify\"></i>\n          </div>\n          <div class=\"verification-result\"></div>\n";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, buffer = 
  "          <div class=\""
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.still_on_page : depth0),{"name":"unless","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n            <a href=\""
    + alias3(alias2((depth0 != null ? depth0.uri : depth0), depth0))
    + "#hunter-email:"
    + alias3(alias2((depths[1] != null ? depths[1].value : depths[1]), depth0))
    + "\" target=\"_blank\" rel=\"nofollow\">\n              "
    + alias3(alias2((depth0 != null ? depth0.uri : depth0), depth0))
    + "\n            </a>\n            <span class=\"source-date\">\n              ";
  stack1 = ((helper = (helper = helpers.userDate || (depth0 != null ? depth0.userDate : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"userDate","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(alias1,options) : helper));
  if (!helpers.userDate) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n            </span>\n"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.still_on_page : depth0),{"name":"unless","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            <br>\n          </div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "not-on-page";
},"10":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(container.lambda((depth0 != null ? depth0.extracted_on : depth0), depth0));
},"12":function(container,depth0,helpers,partials,data) {
    return "            <span class=\"not-on-page-label\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"The email address is no longer on the page\">Removed</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"result\">\n  <table>\n    <tr>\n      <td class=\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.first_name : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n        "
    + ((stack1 = ((helper = (helper = helpers.additional_data || (depth0 != null ? depth0.additional_data : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"additional_data","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n        <div class=\"email-container\">\n          <div class=\"email-copied\"></div>\n          <div class=\"email\">"
    + alias4(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "</div>\n"
    + ((stack1 = (helpers.ifIsVerified || (depth0 && depth0.ifIsVerified) || alias2).call(alias1,(depth0 != null ? depth0.confidence : depth0),{"name":"ifIsVerified","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.program(5, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "          <span class=\"copy-status\">Copy</span>\n        </div>\n      </td>\n      <td class=\"lead-button-td\">"
    + ((stack1 = ((helper = (helper = helpers.lead_button || (depth0 != null ? depth0.lead_button : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lead_button","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</td>\n      <td class=\"sources-link-td\">\n        <span class=\"sources-link\">\n          "
    + alias4(((helper = (helper = helpers.sources_link || (depth0 != null ? depth0.sources_link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sources_link","hash":{},"data":data}) : helper)))
    + "\n          <i class=\"far fa-angle-down\"></i>\n        </span>\n      </td>\n    </tr>\n    <tr>\n      <td colspan=\"3\">\n        <div class=\"sources-list\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.sources : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n      </td>\n    </tr>\n  </table>\n</div>\n";
},"useData":true,"useDepths":true});