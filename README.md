# ember-classic-decorator

This is an empty addon to work around https://github.com/emberjs/ember-classic-decorator/issues/99
By using an empty addon we wont get the ember-classic-decorator linting but we're not using it for any of our apps, it is only used by dependencies, in particular ember-user-activity.
The ember-classic-decorator is a dev/testing only addon and is stripped from production builds. By replacing it with a dummy addon we are effectively stripping it from production development and test builds.
