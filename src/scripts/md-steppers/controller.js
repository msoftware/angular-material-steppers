export default function($scope, $document, $element, $animateCss, $mdUtil) {

  this.steps = [];
  this.stepActive = 0;

  this.addStep = (step) => {
    this.steps.push(step);
  };

  this.isActive = (stepNumber) => {
    if (stepNumber === this.stepActive) {
      return true;
    }

    return false;
  };

  this.hasInkRipple = (stepNumber) => {
    if (this.linear || stepNumber === this.stepActive) {
      return false;
    }

    return true;
  };

  this.setActive = (stepNumber) => {
    let $steppersContent = angular.element($document[0].querySelector('.md-steppers-content'));
    let $stepper = angular.element($document[0].querySelectorAll('.md-stepper')[stepNumber]);

    this.stepActive = stepNumber;

    $animateCss($steppersContent, {
      from: { height: $steppersContent[0].clientHeight + 'px' },
      to: { height: $stepper.prop('clientHeight') + 'px' },
      easing: 'cubic-bezier(.35, 0, .25, 1)',
      duration: 0.4
    }).start().done(() => {
      $steppersContent.css({
        transition: 'none',
        height: ''
      });

      $mdUtil.nextTick(function() {
        $steppersContent.css('transition', '');
      });
    });
  };

  this.changeStep = (stepNumber) => {
    this.setActive(stepNumber);
  };

}
