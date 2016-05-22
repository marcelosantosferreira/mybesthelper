'use strict';

angular.module('mybesthelper.services',['ngResource'])
        .constant("baseURL","http://localhost:3000/")
        .service('matchFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
    			/* TODO: Return the collection matched
                this.getMatches = function(){
                    
                    return $resource(baseURL+"matches/:id", null,  {'update':{method:'PUT' }});
                    
                };
				 */
				/* TODO: Return 1 Match (details)
                this.getAMatch = function() {
                    return   $resource(baseURL+"matches/:id");;
                }
     			*/
                        
        }])
;