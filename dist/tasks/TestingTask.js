'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TestingTask = function (_Elixir$Task) {
    _inherits(TestingTask, _Elixir$Task);

    /**
     * Create a new TestingTask instance.
     *
     * @param  {string}      name
     * @param  {string|null} src
     * @param  {string|null} command
     */
    function TestingTask(name, src, command) {
        _classCallCheck(this, TestingTask);

        var _this = _possibleConstructorReturn(this, (TestingTask.__proto__ || Object.getPrototypeOf(TestingTask)).call(this, name));

        _this.src = src;
        _this.command = command;
        return _this;
    }

    /**
     * Build up the Gulp task.
     */


    _createClass(TestingTask, [{
        key: 'gulpTask',
        value: function gulpTask() {
            return gulp.src('').pipe(this.runTests()).on('error', this.onError()).pipe(this.onSuccess());
        }

        /**
         * Register file watchers.
         */

    }, {
        key: 'registerWatchers',
        value: function registerWatchers() {
            this.watch(this.src || this.pluginConfig('path') + this.pluginConfig('search')).watch(Elixir.config.appPath + '/**/*.php', 'tdd').watch(Elixir.config.viewPath + '/**/*.php', 'tdd');
        }

        /**
         * Trigger the test suite.
         */

    }, {
        key: 'runTests',
        value: function runTests() {
            var command = this.command || this.pluginConfig('command');

            this.recordStep('Executing ' + this.ucName());

            return Elixir.Plugins.shell(command);
        }

        /**
         * Handle any errors.
         */

    }, {
        key: 'onError',
        value: function onError() {
            var task = this.name;

            return function (e) {
                Elixir.Notification.forFailedTests(e, task);

                this.emit('end');
            };
        }

        /**
         * Handle a "green" test suite.
         */

    }, {
        key: 'onSuccess',
        value: function onSuccess() {
            return Elixir.Notification.forPassedTests(this.name);
        }

        /**
         * Retrieve the test suite configuration.
         *
         * @param {string} prop
         */

    }, {
        key: 'pluginConfig',
        value: function pluginConfig(prop) {
            return Elixir.config.testing[this.name][prop];
        }
    }]);

    return TestingTask;
}(Elixir.Task);

exports.default = TestingTask;