---
title: "Conditional forms with django"
date: 2020-12-23
draft: true
---

I've recently begun some freelancing with a charity to help them out with some development work. They have a single django app that they use accross the business. Over the past couple of years, I've worked with django a lot, but always in the context of a DRF powered API and a separate front end. This application is a single monolithic application, using django as it was first designed, 'batteries included'.

I was asked to implement a conditional form where certain questions would only be shown depending on the result of a previous question. This was to support staff in making the right decisions for clients depending on the client's previous answers. I wanted to see if I could entirely do it without using any javascript, which I managed. At the moment, we just need to show users a summary of data and not save any of it, so there are no models associated with it - just a form, a view and a template. The form that I implemented had previously been developed using google forms. As such - there was a simple flow for me to copy, although the form and 14 steps and a number of potential journeys.

I looked around for other's implementations, but most suggested using javascript, or [weren't quite what i was looking for.](https://stackoverflow.com/questions/43001425/django-modelform-with-conditions)

But as a simple demonstration to my implementation, consider this simple conditional flow.

There will be 2 questions in the form:
- What's your favourite food?
- What's your favourite topping? or What's your favourite sauce

By not using any javascript, it means the user must make a request when completing a question - and the server can then present the next question depending on that questions response.

We are also not using a db to store anything as the user progresses, and we don't want to rely on state being maintained in the server. So we attach previous answers to the next url. As such, you really don't want to use this approach for any sensitive or secure information.

Our form will look something like this:

```python
class PizzaForm(Form):
    def __init__(self, *args, **kwargs):
        pass
    def _post_clean(self):
        pass
```

And our view will look something like this:


