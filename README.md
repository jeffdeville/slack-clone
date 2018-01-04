# Intro

Aside from meeting the interview requirements, my goal with this project was to get some familiarity with the direction web applications appears to be heading in 2018. I will try and highlight the choices I made and why here.

# UI

## FlexBox

I'm relatively proficient in Bootstrap, and have played with a number of theme frameworks lately, but trying to mimic the Slack layout isn't something that non-flexbox CSS is any good at. So I figured it was time to finally learn. While the syntax is a little obtuse, it was overall a pleasant experience. CodeSchool's FlexBox course was helpful

# Front End

## React

To be honest, I don't especially like React. I've played w/ Angular 4 and done some small work with VueJS recently, and I liked both of them more than React. I chose React because it's what seems to have the most traction. That said, I expect it to lose tremendous steam in the next 2 years, to be replaced by languages and tools that compile directly into WebAssembly.

## GraphQL

First, I apologize because I know I was supposed to create a RESTful API. Certainly for this use case, REST would have been more than adequate for the data usage patterns. I chose GraphQL because my last React project was VERY poorly served by its RESTful API, and I've been curious how effective GraphQL would be at solving the problems from that last project. Also, I've created RESTful APIs for at least 10 years now. I'm sure I can dig up a code sample for that if you'd just like to see one.

In the end, I was pleasantly surprised with GraphQL for the following reasons:

* A single schema that can be used on client and server promotes consistency.
* Typed data, and methods
* Flexibility to sculpt the data for your UI. Web apps usually wind up bastardizing REST apis for the sake of app efficiency anyway
* A mechanism for data subscriptions is baked in
* The Apollo framework offers a cohesive solution to data management locally. I've seen a lot of tools/libraries in the JS world that intentionally do not offer a complete solution. Much of the app involves gluing the same things together over and over. Apollo handles data queries, validation, mutation, subscriptions, caching, offline access, optimistic updates etc.

# Serverless Backend w/ AWS

There are 2 trends I've been observing in the backend infrastructure world. Teams are either Dockerizing (and Kube-ing) their services, or they're skipping containers entirely, and going to serverless architectures based on small, stateless, functional components. The latter is pretty new, but this feels analogous to the Elixir/Erlang OTP model, which I've done some work in. And I'd also contributed to a [Serverless](https://serverless.com) project. For applications where the 'work' is largely in managing data streams, which is often the case when your UI is client-side, this has felt like a fairly natural fit.

So I decided to try and go with no backend architecture here. The socket-based subscription requirement nearly torpedoed me here, but AWS has a GraphQL service called AppSync that provides subscription updates through MQTT.

## AppSync

AppSync is a preview service that lets you lego together a GraphQL backend using DynamoDB, Lambda, ElasticSearch, IAM, and Cognito. For this project, only DynamoDB and Cognito were needed.

**Pros:**

* The hierarchical method for iteratively digging through the graph of a query was fairly intuitive.
* The closest I got to writing 'server' code was just in my mapping templates that mapped my GraphQL inputs to DynamoDB actions. This is done via a templating language.
* Not having to worry about database hosting or scaling
* I did not feel that I'd lost too much control over the design of my backend data store, because if I needed to do any custom code (for mutations), I could drop down and create a one-off lambda for the operations. Conversely, if I got to a point where I would have needed a complicated query to optimize, I could have either leveraged Dynamo's denormalization to pull the data from a single table, or generated an elasticsearch index for more powerful query capabilities.

**Cons:**

* One of the key areas of interest for me was in figuring out how to tie a dynamic GraphQL queries into an efficient query access pattern. In this, at least w/ AppSync, I was disappointed. If the graph of your GraphQL query is 5 levels deep, expect to run at least 5 queries. There may be more powerful options for optimization using more established frameworks (I hear Absinthe for Elixir/Ecto is fantastic).
* GraphQL will really only work well when your backend data model is easily mapped to your GraphQL schemas. Trying to do this against a crufty legacy system looks like it would be quite painful.
* LOTS OF MAGIC, ESPECIALLY WITH SUBSCRIPTIONS. I got stuck for a full day trying to figure out why one of my subscriptions wasn't firing, because the preview version of AppSync doesn't let you trace through operations to identify where things are failing. I hit a point where I got no errors in my code, but subscriptions just refused to fire, and I had no way to look into the black box to identify why.

## Cognito

Cognito is the Devise of the serverless world.  Absurdly powerful, but a steep learning curve. Amazon will host your user authentication / authorization for free up to like 50,000 users in a system that they claim is HIPAA eligible and PCI compliant. It provides a hosted UI for user management, MFA, etc. TONS of features.

But the docs are abysmal.  There are 2 JS clients. I'm still not sure why. And if you use their API, it is basically an OAuth 2 provider. But I was unable to find anywhere in the docs where it shows how to conduct a complete login flow, which is fairly involved w/ OAuth2. Similarly, there were no docs that discussed how to use Cognito to authorize your GraphQL requests.  Lots of source code reading was required to cobble this together.

## DynamoDB

I didn't have to mess w/ DynamoDB too much, because it's a schemaless data store. That said, I did want to partition the messages by channel.  And had I cared about paging through messages, I'd have needed to create a secondary index on the messages table sorted by date to avoid table scans. (I didn't bother.)

# Project Deficiencies

## Testing

The biggest problem, and if I were interviewing someone, this would be a huge knock in my book, is that there's nary a test in this entire project. There are a few reasons for this.

1. With a serverless backend, I would be forced to either a) create test environments in AWS AppSync and Cognito and run particularly slow & possibly flaky (not local) integration tests, or b) Mock everything out, which would require knowing what to expect before hand, which in this project I almost never did. Compounding this is the fact that forum posts suggest that AWS AppSync can not yet be controlled via CloudFormation. That would leave me with unit testing as the primary option. Just unit testing makes me nervous because it doesn't test the contracts at your boundaries, which makes them useless (at best) for refactoring between components. But even in the serverless project I contributed to, everything was mocked.
2. I've already got some experience w/ unit testing in Javascript, so adding them would not have advanced my own knowledge very much. Additionally, unit tests don't help you refactor your code, the way integration tests do. So adding them after the fact once I'd figured out how all this new tech worked together would not have added a tremendous amount of value

## Bugs

There are a few known bugs. The most egregious one is that after you log in, you have to refresh the page manually. This owes to the fact that the docs for Cognito are so abysmal, and while I cobbled something together, the auth code is in the wrong location. The auth code is just there as a PoC. It needs to be refactored heavily.
