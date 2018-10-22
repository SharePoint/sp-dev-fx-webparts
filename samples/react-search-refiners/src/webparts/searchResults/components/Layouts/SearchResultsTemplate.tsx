import React = require('react');
import ISearchResultsTemplateProps from './ISearchResultsTemplateProps';
import ISearchResultsTemplateState from './ISearchResultsTemplateState';
import                                  './SearchResultsTemplate.scss';
import { Resize } from 'on-el-resize';
import * as $ from                                 'jquery';

export default class SearchResultsTemplate extends React.Component<ISearchResultsTemplateProps, ISearchResultsTemplateState> {

    private parentRef: HTMLElement;
    private resize: Resize;

    constructor() {
        super();
        
        this.resize = new Resize();
        this.state = {
            processedTemplate: null
        };

        this.onComponentResize = this.onComponentResize.bind(this);
    }

    public render() {

        return  <div ref={el => this.parentRef = el}>
                    <div dangerouslySetInnerHTML={{ __html: this.state.processedTemplate }}></div>
                </div>;
    }
     
    public componentWillUnmount() {
        this.resize.removeResizeListener(this.parentRef, this.onComponentResize);
    }

    public componentDidMount() {
        this._updateTemplate(this.props);        
        this.resize.addResizeListener(this.parentRef, this.onComponentResize);
    }

    public componentDidUpdate() {

        // Post render operations (previews on elements, etc.)
        this.props.templateService.initPreviewElements();        
        this.onComponentResize();
    }

    public componentWillReceiveProps(nextProps: ISearchResultsTemplateProps) {
        this._updateTemplate(nextProps);
    }

    private async _updateTemplate(props: ISearchResultsTemplateProps): Promise<void> {

        let templateContent = props.templateContent;

        // Process the Handlebars template
        const template = await this.props.templateService.processTemplate(props.templateContext, templateContent);

        this.setState({
            processedTemplate: template
        });
    }

    private onComponentResize() {

        // Resize iframes accordingly
        $(".iframePreview, .video-js").each((idx, elt) => {
            $(elt).width(Math.floor(this.parentRef.offsetWidth/2));
        });
    }
}
