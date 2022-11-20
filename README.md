## TODO

- add eslint
- add eslint import order

## Layers

- User Interface -> react files, components, views, pages, page factory.
- Infrastructure -> drivers, adapters, repository implementation, libs,
  validations, formatters.
- Application -> use cases, models, dtos, services, repository interface,
  interfaces.
- Domain -> interfaces, validations, entities, value objects.

<img src='./resources/ca-diagram.png' width="350" />

## Domain Layer

At the center is the domain layer. It is the entities and data that describe the
subject area of the application, as well as the code to transform that data. The
domain is the core that distinguishes one application from another.

You can think of the domain as something that won't change if we move from React
to Angular, or if we change some use case.

The data structure of domain entities and the essence of their transformations
are independent from the outer world. External events trigger domain
transformations, but do not determine how they will occur.

## Application Layer

Around the domain is the application layer. This layer describes use cases, i.e.
user scenarios. They are responsible for what happens after some event occurs.

Also, in the application layer there are ports—the specifications of how our
application wants the outside world to communicate with it. Usually a port is an
interface, a behavior contract.

Ports serve as a “buffer zone” between our application's wishes and the reality.
Input Ports tell us how the application wants to be contacted by the outside
world. Output Ports say how the application is going to communicate with the
outside world to make it ready.

## Infrastructure Layer

This layer is responsible to implement the Interface Contracts defined within
the application layer to the Secondary Actors as Adapters. Infrastructure Layer
supports other layer by implementing the abstractions and integrations to
3rd-party library and systems.

Infrastructure layer contains most of your application’s dependencies on
external resources such as file systems, web services, third party APIs, and so
on. The implementation of services should be based on interfaces defined within
the application layer.

## User Interface Layer

This layer is also called as Presentation. Presentation Layer contains the UI
elements (pages, components, routes) of the application. It handles the
presentation (UI, API, etc.) concerns. This layer is responsible for rendering
the Graphical User Interface (GUI) to interact with the user. It is the
application entry-point.

User Interface layer depends on both the Application and Infrastructure layers,
however, **the dependency on Infrastructure is only to support dependency
injection**. This layer can use any library or framework, like React, Angular or
Vue.

Note that the farther we are from the center, the more “service-oriented” the
code functionality is, the farther it is from the domain knowledge of our
application. This will be important later on, when we decide which layer any
module should belong to.

## Dependency Rule

Only the outer layers can depend on the inner layers.

- the domain must be independent.
- the application layer can depend on the domain.
- the infrastructure layer can depend on anything except on ui layer.
- the user interface layer can depend on anything.

<i>remember to use the dependency inversion principle to avoid coupling between
layers</i>

Sometimes this rule can be violated, although it is better not to abuse it. For
example, it is sometimes convenient to use some “library-like” code in a domain,
even though there should be no dependencies. In this repository we are using
yupjs lib on the domain layer to validate our entities.

## References

- https://bespoyasov.me/blog/clean-architecture-on-frontend/
- https://medium.com/dotnet-hub/clean-architecture-with-dotnet-and-dotnet-core-aspnetcore-overview-introduction-getting-started-ec922e53bb97
- https://www.youtube.com/watch?v=kCSiGeUFi_U&t=1955s&ab_channel=RodrigoBranas
- https://www.youtube.com/watch?v=iUQVZHzqGuc&t=1681s&ab_channel=Mango
