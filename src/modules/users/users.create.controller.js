'use strict';

module.exports = (ngModule) => {
  ngModule.controller('usersCreateCtrl', usersCreateCtrl);

  usersCreateCtrl.$inject = ['$state', 'UserService'];

  function usersCreateCtrl($state, UserService) {
    this.editable = true;
    this.positions = [
      'Member',
      'Vocal',
      'Auditor',
      'Sub-Treasurer',
      'Treasurer',
      'Sub-Secretary',
      'Secretary',
      'Vice-President',
      'President'
    ];
    this.roles = [
      'Subscriber',
      'Contributor',
      'Author',
      'Editor',
      'Administrator'
    ];
    this.submitButtonText = 'Crear';
    this.title = 'Crear Usuario';

    this.user = {
      role: 'Subscriber'
    };

    this.resetForm = (form) => {
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }
      this.user = {
        role: 'Subscriber'
      };
    };

    this.submitForm = (form) => {
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }
      UserService.createUser(this.user)
      .then((user) => {
        if (!user.error) {
          return $state.go('admin.users.list');
        }
      });
    };

    this.setAssociate = () => {
      if (this.user.isAssociate) {
        this.user.position = 'Member';
      } else {
        this.user.position = '';
        this.user.isPublic = false;
        this.user.biography = '';
      }
    };
  }
};
