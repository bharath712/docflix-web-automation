const neatCsv = require("neat-csv");

let responseData = { res: [], err: [] }
let token = 'U2FsdGVkX188BdFbW88uzTSwTibluIl+DtUIiNCsB8wr8a+sFRbQS+krMzu8Pnkk';

describe.only('Check the MS is Generating as per the given Test data', () => {

    it('Check the 100 Test data is getting generated', () => {

        cy.api({
            method: 'POST',
            url: 'https://newdev.msmodel.onefin.app/predict',
            failOnStatusCode: false,
            headers: {
                'x-api-key': token
            },
            body: {
                "input_text": "1 Never 0.5 nan 0.5 nan 1 Strongly disagree 0.5 Salary / business income 1 > 90% 0.5 nan 3 Sell half of it 4 Buy some more 1 Strongly disagree 1 I don’t have a financial plan 2 Taking advice from friends, family or colleagues 0.5 nan 1 Once a week 1 Strongly disagree 3 At times, when I see a benefit 4 I set goals to achieve similar 3 Neither agree nor disagree 1 Strongly disagree 5 Never 5 5% – 10% 5 In more than 4 years 5 No loss 5 More than 2 hours 5 Strongly agree"
            }

        }).then((response) => {
            //            cy.writeFile('cypress/fixtures/modelresponse.json', response.body)
            expect(response.status).to.be.eq(200);

            // response.body.index = 1;
            // response.body.input_text = request.body.input_text;
            responseData.res.push(response.requestBody.input_text);

            cy.writeFile('cypress/fixtures/modelresponse.json', responseData);


        });

    });

    it.only('Check the test data with response in json', () => {

        cy.readFile('/Users/bharath/Downloads/1500 New Data.csv').then(neatCsv).then(data => {

            data.forEach((td, index) => {

                cy.api({
                    method: 'POST',
                    failOnStatusCode: false,
                    url: 'https://newdev.msmodel.onefin.app/predict',
                    failOnStatusCode: false,
                    headers: {
                        'x-api-key': token
                    },
                    body: {
                        "input_text": td.text_data
                    }

                }).then((response) => {
                    if (response.status == 200) {

                        let rb = response.body;
                        response.body.sr = td.sr_no;
                        response.body.user_name = td.user_name;
                        response.body.input_text = td.text_data;
                        responseData.res.push(rb);
                        cy.writeFile('cypress/fixtures/modelresponse1.json', responseData);
                    }
                    else {
                        let rb = response.body;
                        response.body.sr = td.sr_no;
                        response.body.user_name = td.user_name;
                        response.body.input_text = td.text_data;
                        responseData.err.push(rb);
                        cy.writeFile('cypress/fixtures/modelresponse1.json', responseData);

                    }
                })

            })

        });

    });

});