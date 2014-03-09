try{ var base = window; }catch( error ){ var base = exports; }
( function module( base ){
	define( "reduceZIndexLevels",
		[
			"underscore"
		],
		function construct( ){
			var reduceZIndexLevels = function reduceZIndexLevels( parentContainer ){
				if( !( parentContainer instanceof $ ) ){
					throw new Error( "invalid parent container" );
				}

				//z-index may start by a reference of the z-index of the container.
				var parentZIndex = parseInt( parentContainer.css( "z-index" ) ) || 1;

				var nodeList = parentContainer[ 0 ].childNodes;
				var zIndexCount = nodeList.length;
				var zIndexList = { };
				for( var index = 0; index < zIndexCount; index++ ){
					var node = $( nodeList[ index ] );
					zIndexList[ node.css( "z-index" ) ) ] = node;
				}

				var sortedZIndexList = _.sortBy( _.keys( zIndexList ) );

				//Check if the first level is an inherited z-index.
				var isInheritedZIndex = sortedZIndexList[ 0 ] == ( parentZIndex + 1 )

				if( isInheritedZIndex ){
					for( var index = 1; index < zIndexCount; index++ ){
						var zIndex = sortedZIndexList[ index - 1 ];
						zIndexList[ zIndex ].css( "z-index", parentZIndex + index );
					}
				}else{
					for( var index = 1; index < zIndexCount; index++ ){
						var zIndex = sortedZIndexList[ index - 1 ];
						zIndexList[ zIndex ].css( "z-index", index );
					}
				}
			};

			base.reduceZIndexLevels = reduceZIndexLevels;
			return reduceZIndexLevels;
		} )
} )( base );