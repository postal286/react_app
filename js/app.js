var myNews = [
  {
    author: 'Саша Печкин',
    text: 'В четчерг, четвертого числа...',
    bigText: 'Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.'
  },
  {
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'Классический текст Lorem Ipsum, используемый с XVI века, приведён ниже. Также даны разделы 1.10.32 и 1.10.33 de Finibus Bonorum et Malorum Цицерона и их английский перевод, сделанный H. Rackham, 1914 год.'
  },
  {
    author: 'Гость',
    text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
    bigText: 'Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам lorem ipsum сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).'
  }
];

window.ee = new EventEmitter();

var News = React.createClass({
	propTypes: {
		data: React.PropTypes.array.isRequired
	},

	render: function() {

		var data = this.props.data;
		var newsTemplate;

		if (data.length > 0) {
			newsTemplate = data.map(function(item, index) {
				return (
					<div key={index}>
						<Article data={item} />
					</div>
					);
			});
		} else {
			newsTemplate = 'Извините, но новостей пока нет.'
		}

		return (
			<div className='news'>
				{newsTemplate}
				<p>
					<strong
					className={'news__count ' + (data.length > 0 ? '' : 'none')}>
					Всего новостей: {data.length}
					</strong>
				</p>
			</div>
			);
	}
});

var Article = React.createClass({
	proptypes: {
		data: React.PropTypes.shape({
			author: React.PropTypes.string.isRequired,
			text: React.PropTypes.string.isRequired,
			bigText: React.PropTypes.string.isRequired
		})
	},

	getInitialState: function() {
		return {
			visible: false
		};
	},

	readmoreClick: function(e) {
		e.preventDefault();
		this.setState({
			visible: !this.state.visible
		});
	},

	render: function (){

		var author = this.props.data.author,
				text = this.props.data.text,
				bigText = this.props.data.bigText,
				visible = this.state.visible;

		return (
			<div className='article'>
				<p className='news__author'>{author}:</p>
				<p className='news__text'>{text}</p>
				<a href='#'
					onClick={this.readmoreClick}
					className={'news__readmore ' + (visible ? 'none': '')}>
				Подробнее
				</a>
				<a href='#'
					onClick={this.readmoreClick}
					className={'news__readmore ' + (visible ? '': 'none')}>
				Скрыть
				</a>
				<p className={'news__big-text ' + (visible ? '' : 'none')}>{bigText}</p>
			</div>
		);
	}
});

var Add = React.createClass({

	getInitialState: function() {
		return ({
			agreeNotChecked: true,
	    bigTextIsEmpty: true,
	    authorIsEmpty: true,
	    textIsEmpty: true,
		});
	},

	componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.author).focus();
  },

  onBtnClickHandler: function (e) {
  	e.preventDefault();
  	var textEl = ReactDOM.findDOMNode(this.refs.text),
  			text = textEl.value,
  			author = ReactDOM.findDOMNode(this.refs.author).value,
  			bigTextEl = ReactDOM.findDOMNode(this.refs.bigText),
  			bigText = bigTextEl.value;

  	var item = [{
  		author: author,
  		text: text,
  		bigText: bigText
  	}];

  	window.ee.emit('News.add', item);

  	textEl.value = '';
  	bigTextEl.value = '';

  	console.log(text);

  	this.setState({
  		textIsEmpty: true,
  		bigTextIsEmpty: true
  	});
  },

	onCheckRuleClick: function () {
		this.setState({agreeNotChecked: !this.state.agreeNotChecked});
	},

	onAuthorChange: function (e) {
		if (e.target.value.trim().length > 0) {
			this.setState({
				authorIsEmpty: false
			});
		} else {
			this.setState({
				authorIsEmpty: true
			});
		}
	},

	onTextChange: function (e){
		if (e.target.value.trim().length > 0) {
			this.setState({
				textIsEmpty: false
			});
		} else {
			this.setState({
				textIsEmpty: true
			});
		}
	},

	onBigTextChange: function (e){
		if (e.target.value.trim().length > 0) {
			this.setState({
				bigTextIsEmpty: false
			});
		} else {
			this.setState({
				bigTextIsEmpty: true
			});
		}
	},

	render: function () {

		var agreeNotChecked = this.state.agreeNotChecked,
				bigTextIsEmpty = this.state.bigTextIsEmpty,
				authorIsEmpty = this.state.authorIsEmpty,
				textIsEmpty = this.state.textIsEmpty;

		return (
      <form className='add cf'>
        <input
          type='text'
          className='add__author'
          defaultValue=''
          placeholder='Ваше имя'
          ref='author'
          onChange={this.onAuthorChange}
        />
        <textarea
          className='add__text'
          defaultValue=''
          placeholder='Текст превью новости'
          ref='text'
          onChange={this.onTextChange}
        >
        </textarea>
        <textarea
          className='add__big-text'
          defaultValue=''
          placeholder='Текст новости'
          ref='bigText'
          onChange={this.onBigTextChange}
        >
        </textarea>
        <label className='add__checkrule'>
          <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick}/>Я согласен с правилами
        </label>
        <button
          className='add__btn'
          onClick={this.onBtnClickHandler}
          ref='alert_button'
          disabled={agreeNotChecked || authorIsEmpty || textIsEmpty || bigTextIsEmpty}>
          Добавить новость
        </button>
      </form>
    );
	}
});



var App = React.createClass({

	getInitialState: function () {
		return ({
			news: myNews
		});
	},

	componentDidMount: function () {
		var self = this;
		window.ee.addListener('News.add', function(item) {
			var nextNews = item.concat(self.state.news);
			self.setState({news: nextNews});
		});
	},

	componentWillUnmount: function () {
		window.ee.removeListener('News.add');
	},

	render: function() {
		return (
			<div className='app'>
				<Add />
				<h3>Новости</h3>
				<News data={this.state.news} />
			</div>
		);
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('root')
);