## Testing 

### The stack
- SinonJs - For spies and stubs
- Mockery - For mocking dependencies
- ChaiJs - For Assertion

### Folder structure
#### Unit tests
The unit tests appear in the same directory as the file you are testing.
```
project
|-src
  |-api
    |-todos
      |--find.js
      |--find.specjs
      |--remove.js
      |--remove.spec.js
```
#### Functional tests
The functional tests appear in a seperate directory called tests.
```
project
|-src
|-tests
  |-api
    |-todos
      |--find.specjs
      |--remove.spec.js
```
### What is a Unit test?
In a unit test, you are basically testing a file. Now this file may require other files in your code and we will use mockery to mock these dependencies.

In these tests all dependencies must be mocked except the standard/3rd party modules like path, http, mongoose, express.. etc

### What is a Functional test?
A functional test can be considered like an integration test where you are testing the behavior of your code with all the modules integrated.

*An important consideration is that these tests should not require your server to come up OR an database connection OR an external end point to be present in *order to run the test.

Here are few of the disadvantages of needing the server to come up OR an database connection OR an external end point to be present in order to run the test.

1. These tests cannot be run as a part commit hook/as a stage in a Jenkins job.
2. In a large system with lots of services/tiers, this is difficult to implement as there we will need to ensure that all the systems are up (including the db) in the state that we want them to be.
3. Results in tons of dummy data in your databases.

**A system with good Unit tests and Functional tests with well agreed upon contracts/interfaces will ensure that all tiers will work seamlessly when they are connected**