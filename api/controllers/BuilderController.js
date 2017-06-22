/**
 * StudentController
 *
 * @description :: Server-side logic for managing homebuilder contact info
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Client = require('node-rest-client').Client;
var client = new Client();
var endpoint = "http://localhost:1337/builder"

module.exports = {

  /**
   * `BuilderController.create()`
   *This function is to create from UI and add the record to database
   */
  create: function (req, res) {

        if(req.method != "POST"){
          return res.view('create');
        }

        var args = {
            data: req.body,
            headers: { "Content-Type": "application/json" }
        };

        client.post(endpoint, args, function (data, response) {
            // return res.view('create', {success: { message: "Record added successfully"}});
            if(response.statusCode != "201"){
                req.addFlash("error", data.message.substring(data.message.indexOf("•")));
                return res.redirect('/create');
            }

            req.addFlash("success", "Record created successfully");
            return res.redirect('/create');

        })

  },


  /**
   * BuilderController.read()`
   *This function is to get the data from builder api (http://localhost:1337/builder) and to view on UI
   */
  read: function (req, res) {

    client.get(endpoint, function (data, response) {
        return res.view('read', {builders: data});
    }).on('error', function (err) {
        return res.view('read', {error: { message: "There was an error getting the builders"}});
    });

  },


   /**
   * `BuilderController.update()`
   * this function is to edit and update the record values.
   */
   update: function (req, res) {

       if(req.method != "POST"){

         client.get(endpoint, function (data, response) {
           return res.view('update', {builders: data});
         }).on('error', function (err) {
             return res.view('update', {error: { message: "There was an error getting the builders"}});
         });

       }else{

         let builderId = req.body.builder_id;
         delete req.body.builder_id;

         var args = {
             data: req.body,
             headers: { "Content-Type": "application/json" }
         };

         client.put(endpoint + "/" + builderId, args, function (data, response) {

           if(response.statusCode != "200"){
               req.addFlash("error", data.message);
               return res.redirect('/update');
           }

           req.addFlash("success", "Record updated successfully");
           return res.redirect('/update');

         })

       }
     },

  /**
   * `BuilderController.delete()`
   * this function is to delete  the records
   */
  delete: function (req, res) {

    if(req.method != "POST"){

      client.get(endpoint, function (data, response) {
        return res.view('delete', {builders: data});
      }).on('error', function (err) {
          return res.view('delete', {error: { message: "There was an error getting the builders"}});
      });

    }else{

      client.delete(endpoint + "/" + req.body.builder_id, function (data, response) {

        if(response.statusCode != "200"){
            req.addFlash("error", data.message);
            return res.redirect('/delete');
        }

        req.addFlash("success", "Record deleted successfully");
        return res.redirect('/delete');

      })
    }

  }

};
