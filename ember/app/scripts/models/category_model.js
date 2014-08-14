/*global Ember, $*/

// ----------------------------------- CATEGORY

EmberApp.Category = Ember.Object.extend(EmberApp.Serializable, {
    propertyNames : [
        'categoryId', 'name'
    ]
});

EmberApp.Category.FIXTURES = [
    {
        categoryId : 31,
        name       : 'Cliente efetivo'
    } ,{
        categoryId : 32,
        name       : 'Cliente em potencial'
    } ,{
        categoryId : 33,
        name       : 'Concorrente'
    } ,{
        categoryId : 34,
        name       : 'Fornecedor'
    } ,{
        categoryId : 35,
        name       : 'Parceiro'
    }
];

