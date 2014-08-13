/*global Ember, $*/

// ----------------------------------- CATEGORY

EmberApp.Category = Ember.Object.extend(EmberApp.Serializable, {
    propertyNames : [
        'categoryId', 'name'
    ]
});

EmberApp.Category.get = function ( id )
{
    return EmberApp.Category.FIXTURES.filter( function ( category )
    {
        return category.get('categoryId') === +id;
    } )[0] || null;
};

EmberApp.Category.FIXTURES = [
    EmberApp.Category.create( {
        categoryId : 31,
        name       : 'Cliente efetivo'
    } ), EmberApp.Category.create( {
        categoryId : 32,
        name       : 'Cliente em potencial'
    } ), EmberApp.Category.create( {
        categoryId : 33,
        name       : 'Concorrente'
    } ), EmberApp.Category.create( {
        categoryId : 34,
        name       : 'Fornecedor'
    } ), EmberApp.Category.create( {
        categoryId : 35,
        name       : 'Parceiro'
    } )
];

