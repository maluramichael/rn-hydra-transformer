# Hydra Transformer #

Hydra isn't that neat to use inside an js application.
You always have to call properties through the [] operator because all hydra properties have a @ prefix.

This transformer sanitize the hydra response.

### How do I get set up? ###
```javascript
import cleanup from 'hydra-transformer';

var cleaned = cleanup({
  "@id": "/api/users/1234"
  //...
});

// cleaned.id => "/api/users/1234"

```

### Contribution guidelines ###

* Writing tests
* Create PRs
* Do not just change the code style

### Who do I talk to? ###

* michael.malura@socialbit.de
