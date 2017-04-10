// Google Maps are in this separate file,
// to prevent the site from breaking down in case the google server doesn't respond
// also this way they can be loaded only when needed

jQuery(document).ready(function($) {
  "use strict";

  // Maps
  $('.maps').each(function() {
    var $uid = ID();
    $(this).addClass($uid);
    var $mapselect = '.' + $uid;
    new Maplace({
      locations: [
        {
          lat: 32.1719305,
          lon: 34.8177699,
          title: 'הרצליה',
          html: ['<div class="mapinfo"><h3>הרצליה</h3>', '<p>המסילה 32 הרצליה</p></div>'].join(''),
          zoom: 15
        }, {
          lat: 32.0648556,
          lon: 34.8276828,
          title: 'רמת גן',
          html: ['<div class="mapinfo"><h3>רמת גן</h3>', '<p>ראש פינה 10 רמת גן</p></div>'].join(''),
          zoom: 15
        }
      ],
      map_div: $mapselect + ' .gmap',
      controls_div: $mapselect + ' .filterlist',
      controls_type: 'list',
      controls_on_map: false,
      show_infowindow: false,
      view_all_text: $($mapselect + ' .filterlist').attr('data-labelall'),
      start: 0,
      map_options: {
        zoom: 11,
        scrollwheel: false
      },
      styles: {
        'Greyscale': [
          {
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }, {
            "featureType": "transit",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }, {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }, {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }, {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }, {
            "stylers": [
              {
                "hue": "#00aaff"
              }, {
                "saturation": -100
              }, {
                "gamma": 2.15
              }, {
                "lightness": 12
              }
            ]
          }, {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "visibility": "on"
              }, {
                "lightness": 24
              }
            ]
          }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "lightness": 57
              }
            ]
          }
        ]
      }
    }).Load();

    // all Options: http://maplacejs.com

  });

}); // document

/**
 * Maplace.js 0.1.33
 *
 * Copyright (c) 2013 Daniele Moraschi
 * Licensed under the MIT license
 * For all details and documentation:
 * http://maplacejs.com
 */
(function(g, t, f, m) {
  var q,
    n,
    p;
  q = {
    activateCurrent: function(e) {
      this.html_element.find("select").val(e)
    },
    getHtml: function() {
      var e = this,
        a = "",
        b;
      if (1 < this.ln) {
        a += '<select class="dropdown controls ' + this.o.controls_cssclass + '">';
        this.ShowOnMenu(this.view_all_key) && (a += '<option value="' + this.view_all_key + '">' + this.o.view_all_text + "</option>");
        for (b = 0; b < this.ln; b += 1)
          this.ShowOnMenu(b) && (a += '<option value="' + (b + 1) + '">' + (this.o.locations[b].title || "#" + (b + 1)) + "</option>");
        a = g(a + "</select>").bind("change", function() {
          e.ViewOnMap(this.value)
        })
      }
      (b = this.o.controls_title) && (b = g('<div class="controls_title"></div>').css(this.o.controls_applycss
        ? {
          fontWeight: "bold",
          fontSize: this.o.controls_on_map
            ? "12px"
            : "inherit",
          padding: "3px 10px 5px 0"
        }
        : {}).append(this.o.controls_title));
      return this.html_element = g('<div class="wrap_controls"></div>').append(b).append(a)
    }
  };
  n = {
    html_a: function(e, a, b) {
      var c = this;
      a = a || e + 1;
      b = b || this.o.locations[e].title;
      e = g('<a data-load="' + a + '" id="ullist_a_' + a + '" href="#' + a + '" title="' + b + '"><span>' + (b || "#" + (e + 1)) + "</span></a>");
      e.css(this.o.controls_applycss
        ? {
          color: "#666",
          display: "block",
          padding: "5px",
          fontSize: this.o.controls_on_map
            ? "12px"
            : "inherit",
          textDecoration: "none"
        }
        : {});
      e.on("click", function(a) {
        a.preventDefault();
        a = g(this).attr("data-load");
        c.ViewOnMap(a)
      });
      return e
    },
    activateCurrent: function(e) {
      this.html_element.find("li").removeClass("active");
      this.html_element.find("#ullist_a_" + e).parent().addClass("active")
    },
    getHtml: function() {
      var e = g("<ul class='ullist controls " + this.o.controls_cssclass + "'></ul>").css(this.o.controls_applycss
          ? {
            margin: 0,
            padding: 0,
            listStyleType: "none"
          }
          : {}),
        a;
      this.ShowOnMenu(this.view_all_key) && e.append(g("<li></li>").append(n.html_a.call(this, !1, this.view_all_key, this.o.view_all_text)));
      for (a = 0; a < this.ln; a++)
        this.ShowOnMenu(a) && e.append(g("<li></li>").append(n.html_a.call(this, a)));

      (a = this.o.controls_title) && (a = g('<div class="controls_title"></div>').css(this.o.controls_applycss
        ? {
          fontWeight: "bold",
          padding: "3px 10px 5px 0",
          fontSize: this.o.controls_on_map
            ? "12px"
            : "inherit"
        }
        : {}).append(this.o.controls_title));
      return this.html_element = g('<div class="wrap_controls"></div>').append(a).append(e)
    }
  };
  p = function() {
    function e(a) {
      this.VERSION = "0.1.33";
      this.loaded = !1;
      this.markers = [];
      this.circles = [];
      this.oMap = !1;
      this.view_all_key = "all";
      this.infowindow = null;
      this.ln = this.maxZIndex = 0;
      this.oMap = !1;
      this.directionsDisplay = this.directionsService = this.Fusion = this.Polygon = this.Polyline = this.current_index = this.current_control = this.controls_wrapper = this.canvas_map = this.map_div = this.oBounds = null;
      this.o = {
        debug: !1,
        map_div: "#gmap",
        controls_div: "#controls",
        generate_controls: !0,
        controls_type: "dropdown",
        controls_cssclass: "",
        controls_title: "",
        controls_on_map: !0,
        controls_applycss: !0,
        controls_position: f.maps.ControlPosition.RIGHT_TOP,
        type: "marker",
        view_all: !0,
        view_all_text: "כל האיזורים",
        pan_on_click: !0,
        start: 0,
        locations: [],
        shared: {},
        map_options: {
          mapTypeId: f.maps.MapTypeId.ROADMAP
        },
        stroke_options: {
          strokeColor: "#0000FF",
          strokeOpacity: .8,
          strokeWeight: 2,
          fillColor: "#0000FF",
          fillOpacity: .4
        },
        directions_options: {
          travelMode: f.maps.TravelMode.DRIVING,
          unitSystem: f.maps.UnitSystem.METRIC,
          optimizeWaypoints: !1,
          provideRouteAlternatives: !1,
          avoidHighways: !1,
          avoidTolls: !1
        },
        circle_options: {
          radius: 100,
          visible: !0
        },
        styles: {},
        fusion_options: {},
        directions_panel: null,
        draggable: !1,
        editable: !1,
        show_infowindows: !0,
        show_markers: !0,
        infowindow_type: "bubble",
        listeners: {},
        beforeViewAll: function() {},
        afterViewAll: function() {},
        beforeShow: function(a, c, d) {},
        afterShow: function(a, c, d) {},
        afterCreateMarker: function(a, c, d) {},
        beforeCloseInfowindow: function(a, c) {},
        afterCloseInfowindow: function(a, c) {},
        beforeOpenInfowindow: function(a, c, d) {},
        afterOpenInfowindow: function(a, c, d) {},
        afterRoute: function(a, c, d) {},
        onPolylineClick: function(a) {},
        onPolygonClick: function(a) {},
        circleRadiusChanged: function(a, c, d) {},
        circleCenterChanged: function(a, c, d) {},
        drag: function(a, c, d) {},
        dragEnd: function(a, c, d) {},
        dragStart: function(a, c, d) {}
      };
      this.AddControl("dropdown", q);
      this.AddControl("list", n);
      a && "directions" === a.type && (!a.show_markers && (a.show_markers = !1), !a.show_infowindows && (a.show_infowindows = !1));
      g.extend(!0, this.o, a)
    }

    e.prototype.controls = {};
    e.prototype.create_objMap = function() {
      var a = 0,
        b;
      for (b in this.o.styles)
        this.o.styles.hasOwnProperty(b) && (0 === a && (this.o.map_options.mapTypeControlOptions = {
          mapTypeIds: [f.maps.MapTypeId.ROADMAP]
        }), a++, this.o.map_options.mapTypeControlOptions.mapTypeIds.push("map_style_" + a));
      if (this.loaded)
        this.oMap.setOptions(this.o.map_options);
      else
        try {
          this.map_div.css({position: "relative", overflow: "hidden"}),
          this.canvas_map = g("<div>").addClass("canvas_map").css({width: "100%", height: "100%"}).appendTo(this.map_div),
          this.oMap = new f.maps.Map(this.canvas_map.get(0), this.o.map_options)
        } catch (c) {
          this.debug("create_objMap::" + this.map_div.selector, c.toString())
        }
      a = 0;
      for (b in this.o.styles)
        this.o.styles.hasOwnProperty(b) && (a++, this.oMap.mapTypes.set("map_style_" + a, new f.maps.StyledMapType(this.o.styles[b], {name: b})), this.oMap.setMapTypeId("map_style_" + a))
    };
    e.prototype.add_markers_to_objMap = function() {
      var a,
        b;
      a = this.o.type || "marker";
      switch (a) {
        case "marker":
          for (a = 0; a < this.ln; a++)
            b = this.create_objPoint(a),
            this.create.marker.call(this, a, b);
          break;
        default:
          this.create[a].apply(this)
      }
    };
    e.prototype.create_objPoint = function(a) {
      a = g.extend({}, this.o.locations[a]);
      var b = a.visible === m
        ? m
        : a.visible;
      !a.type && (a.type = this.o.type);
      a.map = this.oMap;
      a.position = new f.maps.LatLng(a.lat, a.lon);
      a.zIndex = a.zIndex === m
        ? 1E4
        : a.zIndex + 100;
      a.visible = b === m
        ? this.o.show_markers
        : b;
      this.o.maxZIndex = a.zIndex > this.maxZIndex
        ? a.zIndex
        : this.maxZIndex;
      a.image && (a.icon = new f.maps.MarkerImage(a.image, new f.maps.Size(a.image_w || 32, a.image_h || 32), new f.maps.Point(0, 0), new f.maps.Point((a.image_w || 32) / 2, (a.image_h || 32) / 2)));
      return a
    };
    e.prototype.create_objCircle = function(a) {
      var b,
        c,
        d;
      d = g.extend({}, a);
      b = g.extend({}, this.o.stroke_options);
      c = g.extend({}, this.o.circle_options);
      g.extend(b, a.stroke_options || {});
      g.extend(d, b);
      g.extend(c, a.circle_options || {});
      g.extend(d, c);
      d.center = a.position;
      d.draggable = !1;
      d.zIndex = 0 < a.zIndex
        ? a.zIndex - 10
        : 1;
      return d
    };
    e.prototype.add_markerEv = function(a, b, c) {
      var d = this;
      f.maps.event.addListener(c, "click", function(e) {
        d.o.beforeShow(a, b, c);
        d.o.show_infowindows && !1 !== b.show_infowindow && d.open_infowindow(a, c, e);
        d.o.pan_on_click && !1 !== b.pan_on_click && (d.oMap.panTo(b.position), b.zoom && d.oMap.setZoom(b.zoom));
        d.current_control && d.o.generate_controls && d.current_control.activateCurrent && d.current_control.activateCurrent.call(d, a + 1);
        d.current_index = a;
        d.o.afterShow(a, b, c)
      });
      b.draggable && this.add_dragEv(a, b, c)
    };
    e.prototype.add_circleEv = function(a, b, c) {
      var d = this;
      f.maps.event.addListener(c, "click", function() {
        d.ViewOnMap(a + 1)
      });
      f.maps.event.addListener(c, "center_changed", function() {
        d.o.circleCenterChanged(a, b, c)
      });
      f.maps.event.addListener(c, "radius_changed", function() {
        d.o.circleRadiusChanged(a, b, c)
      });
      b.draggable && this.add_dragEv(a, b, c)
    };
    e.prototype.add_dragEv = function(a, b, c) {
      var d = this;
      f.maps.event.addListener(c, "drag", function(e) {
        var g;
        if (c.getPosition)
          e = c.getPosition();
        else if (c.getCenter)
          e = c.getCenter();
        else
          return;
        d.circles[a] && d.circles[a].setCenter(e);
        d.Polyline
          ? g = "Polyline"
          : d.Polygon && (g = "Polygon");
        if (g) {
          for (var k = d[g].getPath().getArray(), h = [], l = 0; l < k.length; ++l)
            h[l] = a === l
              ? new f.maps.LatLng(e.lat(), e.lng())
              : new f.maps.LatLng(k[l].lat(), k[l].lng());
          d[g].setPath(new f.maps.MVCArray(h));
          d.add_polyEv(g)
        }
        d.o.drag(a, b, c)
      });
      f.maps.event.addListener(c, "dragend", function() {
        d.o.dragEnd(a, b, c)
      });
      f.maps.event.addListener(c, "dragstart", function() {
        d.o.dragStart(a, b, c)
      });
      f.maps.event.addListener(c, "center_changed", function() {
        d.markers[a] && c.getCenter && d.markers[a].setPosition(c.getCenter());
        d.o.drag(a, b, c)
      })
    };
    e.prototype.add_polyEv = function(a) {
      var b = this;
      f.maps.event.addListener(this[a].getPath(), "set_at", function(c, d) {
        var e = b[a].getPath().getAt(c),
          e = new f.maps.LatLng(e.lat(), e.lng());
        b.markers[c] && b.markers[c].setPosition(e);
        b.circles[c] && b.circles[c].setCenter(e);
        b.o["on" + a + "Changed"](c, d, b[a].getPath().getArray())
      })
    };
    e.prototype.create = {
      marker: function(a, b, c) {
        var d;
        "circle" != b.type || c || (d = this.create_objCircle(b), b.visible || (d.draggable = b.draggable), c = new f.maps.Circle(d), this.add_circleEv(a, d, c), this.circles[a] = c);
        b.type = "marker";
        c = new f.maps.Marker(b);
        this.add_markerEv(a, b, c);
        this.oBounds.extend(b.position);
        this.markers[a] = c;
        this.o.afterCreateMarker(a, b, c);
        return c
      },
      circle: function() {
        var a,
          b,
          c,
          d;
        for (a = 0; a < this.ln; a++)
          b = this.create_objPoint(a),
          "circle" == b.type && (c = this.create_objCircle(b), b.visible || (c.draggable = b.draggable), d = new f.maps.Circle(c), this.add_circleEv(a, c, d), this.circles[a] = d),
          b.type = "marker",
          this.create.marker.call(this, a, b, d)
      },
      polyline: function() {
        var a,
          b,
          c = g.extend({}, this.o.stroke_options);
        c.path = [];
        c.draggable = this.o.draggable;
        c.editable = this.o.editable;
        c.map = this.oMap;
        c.zIndex = this.o.maxZIndex + 100;
        for (a = 0; a < this.ln; a++)
          b = this.create_objPoint(a),
          this.create.marker.call(this, a, b),
          c.path.push(b.position);
        this.Polyline
          ? this.Polyline.setOptions(c)
          : this.Polyline = new f.maps.Polyline(c);
        this.add_polyEv("Polyline")
      },
      polygon: function() {
        var a = this,
          b,
          c,
          d = g.extend({}, this.o.stroke_options);
        d.path = [];
        d.draggable = this.o.draggable;
        d.editable = this.o.editable;
        d.map = this.oMap;
        d.zIndex = this.o.maxZIndex + 100;
        for (b = 0; b < this.ln; b++)
          c = this.create_objPoint(b),
          this.create.marker.call(this, b, c),
          d.path.push(c.position);
        this.Polygon
          ? this.Polygon.setOptions(d)
          : this.Polygon = new f.maps.Polygon(d);
        f.maps.event.addListener(this.Polygon, "click", function(b) {
          a.o.onPolygonClick(b)
        });
        this.add_polyEv("Polygon")
      },
      fusion: function() {
        this.o.fusion_options.styles = [this.o.stroke_options];
        this.o.fusion_options.map = this.oMap;
        this.Fusion
          ? this.Fusion.setOptions(this.o.fusion_options)
          : this.Fusion = new f.maps.FusionTablesLayer(this.o.fusion_options)
      },
      directions: function() {
        var a = this,
          b,
          c,
          d,
          e,
          r,
          k = [],
          h = 0;
        for (b = 0; b < this.ln; b++)
          c = this.create_objPoint(b),
          0 === b
            ? e = c.position
            : b === this.ln - 1
              ? r = c.position
              : (d = !0 === this.o.locations[b].stopover
                ? !0
                : !1, k.push({location: c.position, stopover: d})),
          this.create.marker.call(this, b, c);
        this.o.directions_options.origin = e;
        this.o.directions_options.destination = r;
        this.o.directions_options.waypoints = k;
        this.directionsService || (this.directionsService = new f.maps.DirectionsService);
        this.directionsDisplay
          ? this.directionsDisplay.setOptions({draggable: this.o.draggable})
          : this.directionsDisplay = new f.maps.DirectionsRenderer({draggable: this.o.draggable});
        this.directionsDisplay.setMap(this.oMap);
        this.o.directions_panel && (this.o.directions_panel = g(this.o.directions_panel), this.directionsDisplay.setPanel(this.o.directions_panel.get(0)));
        this.o.draggable && f.maps.event.addListener(this.directionsDisplay, "directions_changed", function() {
          h = a.compute_distance(a.directionsDisplay.directions);
          a.o.afterRoute(h)
        });
        this.directionsService.route(this.o.directions_options, function(b, c) {
          c === f.maps.DirectionsStatus.OK && (h = a.compute_distance(b), a.directionsDisplay.setDirections(b));
          a.o.afterRoute(h, c, b)
        })
      }
    };
    e.prototype.compute_distance = function(a) {
      var b = 0,
        c = a.routes[0],
        d = c.legs.length;
      for (a = 0; a < d; a++)
        b += c.legs[a].distance.value;
      return b
    };
    e.prototype.type_to_open = {
      bubble: function(a) {
        this.infowindow = new f.maps.InfoWindow({
          content: a.html || ""
        })
      }
    };
    e.prototype.open_infowindow = function(a, b, c) {
      this.CloseInfoWindow();
      c = this.o.locations[a];
      var d = this.o.infowindow_type;
      c.html && this.type_to_open[d] && (this.o.beforeOpenInfowindow(a, c, b), this.type_to_open[d].call(this, c), this.infowindow.open(this.oMap, b), this.o.afterOpenInfowindow(a, c, b))
    };
    e.prototype.get_html_controls = function() {
      return this.controls[this.o.controls_type] && this.controls[this.o.controls_type].getHtml
        ? (this.current_control = this.controls[this.o.controls_type], this.current_control.getHtml.apply(this))
        : ""
    };
    e.prototype.generate_controls = function() {
      if (this.o.controls_on_map) {
        var a = g('<div class="on_gmap ' + this.o.controls_type + ' gmap_controls"></div>').css(this.o.controls_applycss
            ? {
              margin: "5px"
            }
            : {}),
          b = g(this.get_html_controls()).css(this.o.controls_applycss
            ? {
              background: "#fff",
              padding: "5px",
              border: "1px solid rgb(113,123,135)",
              boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px",
              maxHeight: this.map_div.find(".canvas_map").outerHeight() - 80,
              minWidth: 100,
              overflowY: "auto",
              overflowX: "hidden"
            }
            : {});
        a.append(b);
        this.oMap.controls[this.o.controls_position].push(a.get(0))
      } else
        this.controls_wrapper.empty(),
        this.controls_wrapper.append(this.get_html_controls())
    };
    e.prototype.init_map = function() {
      var a = this;
      this.Polyline && this.Polyline.setMap(null);
      this.Polygon && this.Polygon.setMap(null);
      this.Fusion && this.Fusion.setMap(null);
      this.directionsDisplay && this.directionsDisplay.setMap(null);
      for (var b = this.markers.length - 1; 0 <= b; --b)
        try {
          this.markers[b] && this.markers[b].setMap(null)
        } catch (c) {
          a.debug("init_map::markers::setMap", c.stack)
        }
      this.markers.length = 0;
      this.markers = [];
      for (b = this.circles.length - 1; 0 <= b; --b)
        try {
          this.circles[b] && this.circles[b].setMap(null)
        } catch (d) {
          a.debug("init_map::circles::setMap", d.stack)
        }
      this.circles.length = 0;
      this.circles = [];
      this.o.controls_on_map && this.oMap.controls && this.oMap.controls[this.o.controls_position].forEach(function(b, c) {
        try {
          a.oMap.controls[this.o.controls_position].removeAt(c)
        } catch (d) {
          a.debug("init_map::removeAt", d.stack)
        }
      });
      this.oBounds = new f.maps.LatLngBounds
    };
    e.prototype.perform_load = function() {
      1 === this.ln
        ? (this.o.map_options.set_center
          ? this.oMap.setCenter(new f.maps.LatLng(this.o.map_options.set_center[0], this.o.map_options.set_center[1]))
          : (this.oMap.fitBounds(this.oBounds), this.ViewOnMap(1)), this.o.map_options.zoom && this.oMap.setZoom(this.o.map_options.zoom))
        : 0 === this.ln
          ? (this.o.map_options.set_center
            ? this.oMap.setCenter(new f.maps.LatLng(this.o.map_options.set_center[0], this.o.map_options.set_center[1]))
            : this.oMap.fitBounds(this.oBounds), this.oMap.setZoom(this.o.map_options.zoom || 1))
          : (this.oMap.fitBounds(this.oBounds), "number" === typeof(this.o.start - 0) && 0 < this.o.start && this.o.start <= this.ln
            ? this.ViewOnMap(this.o.start)
            : this.o.map_options.set_center
              ? this.oMap.setCenter(new f.maps.LatLng(this.o.map_options.set_center[0], this.o.map_options.set_center[1]))
              : this.ViewOnMap(this.view_all_key), this.o.map_options.zoom && this.oMap.setZoom(this.o.map_options.zoom))
    };
    e.prototype.debug = function(a, b) {
      this.o.debug && console.log(a, b);
      return this
    };
    e.prototype.AddControl = function(a, b) {
      if (!a || !b)
        return self.debug("AddControl", 'Missing "name" and "func" callback.'),
        !1;
      this.controls[a] = b;
      return this
    };
    e.prototype.CloseInfoWindow = function() {
      this.infowindow && (this.current_index || 0 === this.current_index) && (this.o.beforeCloseInfowindow(this.current_index, this.o.locations[this.current_index]), this.infowindow.close(), this.infowindow = null, this.o.afterCloseInfowindow(this.current_index, this.o.locations[this.current_index]));
      return this
    };
    e.prototype.ShowOnMenu = function(a) {
      if (a === this.view_all_key && this.o.view_all && 1 < this.ln)
        return !0;
      a = parseInt(a, 10);
      return "number" === typeof(a - 0) && 0 <= a && a < this.ln && !1 !== this.o.locations[a].on_menu
        ? !0
        : !1
    };
    e.prototype.ViewOnMap = function(a) {
      if (a === this.view_all_key)
        this.o.beforeViewAll(),
        this.current_index = a,
        0 < this.o.locations.length && this.o.generate_controls && this.current_control && this.current_control.activateCurrent && this.current_control.activateCurrent.apply(this, [a]),
        this.oMap.fitBounds(this.oBounds),
        this.CloseInfoWindow(),
        this.o.afterViewAll();
      else if (a = parseInt(a, 10), "number" === typeof(a - 0) && 0 < a && a <= this.ln)
        try {
          f.maps.event.trigger(this.markers[a - 1], "click")
        } catch (b) {
          this.debug("ViewOnMap::trigger", b.stack)
        }
      return this
    };
    e.prototype.SetLocations = function(a, b) {
      this.o.locations = a;
      b && this.Load();
      return this
    };
    e.prototype.AddLocations = function(a, b) {
      var c = this;
      g.isArray(a) && g.each(a, function(a, b) {
        c.o.locations.push(b)
      });
      g.isPlainObject(a) && this.o.locations.push(a);
      b && this.Load();
      return this
    };
    e.prototype.AddLocation = function(a, b, c) {
      g.isPlainObject(a) && this.o.locations.splice(b, 0, a);
      c && this.Load();
      return this
    };
    e.prototype.RemoveLocations = function(a, b) {
      var c = this,
        d = 0;
      g.isArray(a)
        ? g.each(a, function(a, b) {
          b - d < c.ln && c.o.locations.splice(b - d, 1);
          d++
        })
        : a < this.ln && this.o.locations.splice(a, 1);
      b && this.Load();
      return this
    };
    e.prototype.Loaded = function() {
      return this.loaded
    };
    e.prototype._init = function() {
      this.ln = this.o.locations.length;
      for (var a = 0; a < this.ln; a++) {
        var b = g.extend({}, this.o.shared);
        this.o.locations[a] = g.extend(b, this.o.locations[a]);
        this.o.locations[a].html && (this.o.locations[a].html = this.o.locations[a].html.replace("%index", a + 1), this.o.locations[a].html = this.o.locations[a].html.replace("%title", this.o.locations[a].title || ""))
      }
      this.map_div = g(this.o.map_div);
      this.controls_wrapper = g(this.o.controls_div);
      return this
    };
    e.prototype.Load = function(a) {
      g.extend(!0, this.o, a);
      a && a.locations && (this.o.locations = a.locations);
      this._init();
      !1 === this.o.visualRefresh
        ? f.maps.visualRefresh = !1
        : f.maps.visualRefresh = !0;
      this.init_map();
      this.create_objMap();
      this.add_markers_to_objMap();
      1 < this.ln && this.o.generate_controls || this.o.force_generate_controls
        ? (this.o.generate_controls = !0, this.generate_controls())
        : this.o.generate_controls = !1;
      var b = this;
      if (this.loaded)
        this.perform_load();
      else {
        f.maps.event.addListenerOnce(this.oMap, "idle", function() {
          b.perform_load()
        });
        f.maps.event.addListener(this.oMap, "resize", function() {
          b.canvas_map.css({width: b.map_div.width(), height: b.map_div.height()})
        });
        for (var c in this.o.listeners) {
          var d = this.oMap,
            e = this.o.listeners[c];
          this.o.listeners.hasOwnProperty(c) && f.maps.event.addListener(this.oMap, c, function(a) {
            e(d, a)
          })
        }
      }
      this.loaded = !0;
      return this
    };
    return e
  }();
  "function" == typeof define && define.amd
    ? define(function() {
      return p
    })
    : t.Maplace = p
})(jQuery, this, google);
