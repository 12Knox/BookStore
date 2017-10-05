const { OperationHelper } = require('apac');

let opHelper = new OperationHelper({
  awsId: 'AKIAJKZSA3XIWTBEWEKA',
  awsSecret: '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',
  assocId: 'eisuke1212-22',
  endPoint: 'ecs.amazonaws.jp',
});

const operation = 'ItemSearch';
const params = {
  SearchIndex: 'Books',
  Keywords: 'はあちゅう',
  ResponseGroup: 'ItemAttributes,Offers',
};

opHelper.execute(operation, params).then((results, responseBody) => {
  console.log(results);
  console.log(responseBody);
}).catch((err) => {
  console.error(err);
});
